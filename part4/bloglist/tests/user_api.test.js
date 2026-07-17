const { describe, test, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const User = require('../models/user');
const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');

const api = supertest(app);

const userData = {
    username: 'user1',
    name: 'user',
    passwordHash:
        '$2b$10$h0/BCa6xDxivRonq5GZ/4.tueYCH2gMohFc/KUvPsrkgR/REdZWJ2',
};

const newUser = {
    username: 'user2',
    name: 'user',
    password: '1234',
};

describe('User gets created correctly', async () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const user = new User(userData);

        await user.save();
    });

    test('specific user can be found', async () => {
        const response = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const users = response.body;
        const usernames = users.map((u) => u.username);

        assert(usernames.includes(userData.username));
    });

    test('user with unique username can be added', async () => {
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('user with used username cant be added', async () => {
        const usedUsernameUser = {
            username: userData.username,
            name: 'user',
            password: '1234',
        };

        await api.post('/api/users').send(usedUsernameUser).expect(400);
    });

    test('user with to short username cant be added', async () => {
        const usedUsernameUser = {
            username: 'Ab',
            name: 'user',
            password: '1234',
        };

        await api.post('/api/users').send(usedUsernameUser).expect(400);
    });

    test('user with to short password cant be added', async () => {
        const usedUsernameUser = {
            username: userData.username,
            name: 'user',
            password: '12',
        };

        await api.post('/api/users').send(usedUsernameUser).expect(400);
    });
});

after(async () => {
    await mongoose.connection.close();
});
