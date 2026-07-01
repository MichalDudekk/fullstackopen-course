// index.js
const express = require('express');
const mongoose = require('mongoose');
const { PORT, MONGODB_URI } = require('./utils/config.js');
const Blog = require('./models/blog.js');
const { info, error } = require('./utils/logger.js');

const app = express();

info(`connecting to: ${MONGODB_URI}`);
mongoose
    .connect(MONGODB_URI, { family: 4 })
    .then(() => info('succesfully connected to MongoDB'))
    .catch((e) => error(`error contecting to mongodb: ${e}`));

app.use(express.json());

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs);
    });
});

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog.save().then((result) => {
        response.status(201).json(result);
    });
});

app.listen(PORT, () => {
    info(`Server running on port ${PORT}`);
});
