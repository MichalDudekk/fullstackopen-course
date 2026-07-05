// blogs.js
const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs);
    });
});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
        response.status(404).json({ message: 'blog not found' });
    }
    response.status(200).json(blog);
});

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);

    const result = await blog.save();
    response.status(201).json(result);
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
