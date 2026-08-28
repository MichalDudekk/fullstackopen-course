// users.js
const userRouter = require('express').Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const { error } = require('../utils/logger.js');

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { user: 0 });
    response.json(users);
});

userRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id).populate('blogs', {
        user: 0,
    });
    response.json(user);
});

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;

    if (password.length < 3)
        return response
            .status(400)
            .json({ error: 'password must be at least 3 characters long' });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        username: username,
        name: name,
        passwordHash: passwordHash,
        blogs: [],
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
});

module.exports = userRouter;
