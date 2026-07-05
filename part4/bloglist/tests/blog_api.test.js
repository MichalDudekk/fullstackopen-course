const { describe, test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const Blog = require('../models/blog.js');
const supertest = require('supertest');
const app = require('../app.js');
const helper = require('./test_helper.js');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

describe('Blog api', () => {
    test('GET returns the correct amount of blog posts in the JSON format', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.length, helper.initialBlogs.length);
    });

    test('Identifier of the blog posts is named id (not _id)', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        assert(
            response.body.length > 0,
            'The response array should not be empty',
        );

        response.body.forEach((blog) => {
            assert.notStrictEqual(
                blog.id,
                undefined,
                'Blog should have an "id" property',
            );
            assert.strictEqual(
                blog._id,
                undefined,
                'Blog should NOT have an "_id" property',
            );
        });
    });

    test('New blog with no likes property gets likes: 0 by default', async () => {
        const response = await api
            .post('/api/blogs')
            .send(helper.noteWithNoLikes)
            .expect(201);
        assert.strictEqual(response.body.likes, 0);
    });

    test('New blog with no title or url returns code 400', async () => {
        const blog = helper.initialBlogs[0];
        const { url, ...blogWithoutUrl } = blog;
        const { title, ...blogWithoutTitle } = blog;
        const { url: url2, title: title2, ...blogWithoutBoth } = blog;

        await api.post('/api/blogs').send(blogWithoutUrl).expect(400);
        await api.post('/api/blogs').send(blogWithoutTitle).expect(400);
        await api.post('/api/blogs').send(blogWithoutBoth).expect(400);
    });
});

after(async () => {
    await mongoose.connection.close();
});
