// blogs.js
const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const getTokenFrom = (request) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
    return null;
};

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { blogs: 0 });
    response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
        response.status(404).json({ message: 'blog not found' });
    }
    response.status(200).json(blog);
});

blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body;

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({ title, author, url, likes, user });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
    const { title, url, author, likes } = request.body;

    const blog = await Blog.findById(request.params.id);
    if (!blog) {
        return response.status(404).json({ message: 'blog not found' });
    }

    blog.title = title;
    blog.url = url;
    blog.author = author;
    blog.likes = likes;

    const updatedBlog = await blog.save();
    response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
