// blogs.js
const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const { userExtractor } = require('../utils/middleware.js');

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

blogsRouter.post('/', userExtractor, async (request, response) => {
    const { title, author, url, likes } = request.body;

    const blog = new Blog({ title, author, url, likes, user: request.user });
    const savedBlog = await blog.save();

    request.user.blogs = request.user.blogs.concat(savedBlog._id);
    await request.user.save();

    response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
        return response.status(204).end();
    }

    if (blog.user.toString() !== request.user.id.toString()) {
        return response.status(403).json({
            error: 'access denied, only the creator of the post can delete it',
        });
    }

    request.user.blogs = request.user.blogs.filter(
        (blogId) => blogId !== blog.id,
    );

    // should be a transaction
    await blog.deleteOne();
    await request.user.save();

    response.status(204).end();
});

blogsRouter.put('/:id', userExtractor, async (request, response) => {
    const { title, url, author, likes, user } = request.body;

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
        return response.status(404).json({ message: 'blog not found' });
    }

    if (blog.user.toString() !== request.user.id.toString()) {
        return response.status(403).json({
            error: 'access denied, only the creator of the post can update it',
        });
    }

    const newUser = await User.findById(user);

    blog.title = title;
    blog.url = url;
    blog.author = author;
    blog.likes = likes;
    blog.user = newUser;

    const updatedBlog = await blog.save();
    response.status(200).json(updatedBlog);
});

blogsRouter.post('/:id/comments', userExtractor, async (request, response) => {
    if (!request.user) {
        return response.status(401);
    }

    const { comment } = request.body;

    if (!typeof comment === 'string') {
        return response.status(400);
    }

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
        return response.status(404).json({ message: 'blog not found' });
    }

    blog.comments.push(comment);

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
