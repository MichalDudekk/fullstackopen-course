// app.js
const express = require('express');
const mongoose = require('mongoose');
const { PORT, MONGODB_URI } = require('./utils/config.js');
const Blog = require('./models/blog.js');
const blogRouter = require('./controllers/blogs.js');
const { info, error } = require('./utils/logger.js');
const middleware = require('./utils/middleware.js');

const app = express();

info(`connecting to: ${MONGODB_URI}`);
mongoose
    .connect(MONGODB_URI, { family: 4 })
    .then(() => info('succesfully connected to MongoDB'))
    .catch((e) => error(`error contecting to mongodb: ${e}`));

app.use(express.json());
app.use(express.static('dist'));
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
