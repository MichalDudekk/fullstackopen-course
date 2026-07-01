// index.js
const express = require('express');
const mongoose = require('mongoose');
const { PORT, MONGODB_URI } = require('./utils/config.js');
const Blog = require('./models/blog.js');
const blogRouter = require('./controllers/blogs.js');
const { info, error } = require('./utils/logger.js');

const app = express();

info(`connecting to: ${MONGODB_URI}`);
mongoose
    .connect(MONGODB_URI, { family: 4 })
    .then(() => info('succesfully connected to MongoDB'))
    .catch((e) => error(`error contecting to mongodb: ${e}`));

app.use(express.json());

app.use('/api/blogs', blogRouter);

app.listen(PORT, () => {
    info(`Server running on port ${PORT}`);
});
