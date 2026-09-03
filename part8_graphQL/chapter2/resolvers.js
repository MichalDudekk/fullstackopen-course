const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const Person = require('./models/person');
const User = require('./models/user');

let persons = [
    {
        name: 'Arto Hellas',
        phone: '040-123543',
        street: 'Tapiolankatu 5 A',
        city: 'Espoo',
        id: '3d594650-3436-11e9-bc57-8b80ba54c431',
    },
    {
        name: 'Matti Luukkainen',
        phone: '040-432342',
        street: 'Malminkaari 10 A',
        city: 'Helsinki',
        id: '3d599470-3436-11e9-bc57-8b80ba54c431',
    },
    {
        name: 'Venla Ruuska',
        street: 'Nallemäentie 22 C',
        city: 'Helsinki',
        id: '3d599471-3436-11e9-bc57-8b80ba54c431',
    },
];

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: (root, args) => {
            if (!args.phone) {
                return Person.find({});
            }

            return Person.find({ phone: { $exists: args.phone === 'YES' } });
        },
        findPerson: (root, args) => Person.findOne({ name: args.name }),
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Person: {
        address: ({ street, city }) => {
            return {
                street,
                city,
            };
        },
    },
    Mutation: {
        addPerson: async (root, args, context) => {
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    },
                });
            }

            const nameExists = await Person.exists({ name: args.name });

            if (nameExists) {
                throw new GraphQLError(`Name must be unique: ${args.name}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                    },
                });
            }

            const person = new Person({ ...args });

            try {
                await person.save();
                currentUser.friends = currentUser.friends.concat(person);
                await currentUser.save();
            } catch (error) {
                throw new GraphQLError(
                    `Saving person failed: ${error.message}`,
                    {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error,
                        },
                    },
                );
            }

            return person;
        },
        editNumber: async (root, args) => {
            const person = await Person.findOne({ name: args.name });

            if (!person) {
                return null;
            }

            person.phone = args.phone;

            try {
                await person.save();
            } catch (error) {
                throw new GraphQLError(
                    `Saving number failed: ${error.message}`,
                    {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error,
                        },
                    },
                );
            }

            return person;
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username });

            return user.save().catch((error) => {
                throw new GraphQLError(
                    `Creating the user failed: ${error.message}`,
                    {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.username,
                            error,
                        },
                    },
                );
            });
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        },
        addAsFriend: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }

            const nonFriendAlready = (person) =>
                !currentUser.friends
                    .map((f) => f._id.toString())
                    .includes(person._id.toString());

            const person = await Person.findOne({ name: args.name });

            if (!person) {
                throw new GraphQLError("The name didn't found", {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                    },
                });
            }

            if (nonFriendAlready(person)) {
                currentUser.friends = currentUser.friends.concat(person);
            }

            await currentUser.save();

            return currentUser;
        },
    },
};

module.exports = resolvers;
