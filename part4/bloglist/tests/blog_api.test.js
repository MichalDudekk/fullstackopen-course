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
});

after(async () => {
    await mongoose.connection.close();
});
