// test_helper.js
const Blog = require('../models/blog.js');

const initialBlogs = [
    {
        title: 'titled',
        author: 'admin',
        url: 'url',
        likes: 0,
    },
    {
        title: 'titled1',
        author: 'admin',
        url: 'url',
        likes: 0,
    },
];

const noteWithNoLikes = {
    title: 'titled20',
    author: 'admin',
    url: 'url',
};

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'willremovethissoon',
        author: 'none',
        url: 'none',
        likes: 0,
    });
    await blog.save();
    await blog.deleteOne();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, noteWithNoLikes, blogsInDb, nonExistingId };
