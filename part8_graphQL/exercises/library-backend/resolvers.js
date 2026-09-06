const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const resolvers = {
    Query: {
        bookCount: async () => {
            const books = await Book.find({});
            return books.length;
        },
        authorCount: async () => {
            const authors = await Author.find({});
            return authors.length;
        },
        allBooks: async (root, args) => {
            let result;
            if (!args.author && !args.genre) {
                result = await Book.find({}).populate('author');
            }
            // if (args.author) {
            //     result = await Book.find({ author: {args.author} }).populate(
            //         'author',
            //     );
            // }
            if (args.genre) {
                result = await Book.find({ genres: args.genre }).populate(
                    'author',
                );
            }
            return result;
        },
        allAuthors: async () => {
            return await Author.find({});
        },
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Mutation: {
        _resetDatabase: async () => {
            if (process.env.NODE_ENV !== 'test') {
                throw new GraphQLError(
                    '_resetDatabase is only available in test mode',
                );
            }
            await Author.deleteMany({});
            await Book.deleteMany({});
            await User.deleteMany({});
            return true;
        },
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    },
                });
            }

            const { title, published, author, genres } = args;

            let authorToSave;
            try {
                authorToSave = await Author.findOneAndUpdate(
                    { name: author },
                    { $setOnInsert: { name: author } },
                    { new: true, upsert: true, runValidators: true },
                );
            } catch (error) {
                // rzadkie dwa inserty jednocześnie - 11000 to duplicate name
                if (error.code === 11000) {
                    authorToSave = await Author.findOne({ name: author });
                } else {
                    throw new GraphQLError(
                        `Saving author failed: ${error.message}`,
                        {
                            extensions: {
                                code: 'BAD_USER_INPUT',
                                invalidArgs: args.author,
                                error,
                            },
                        },
                    );
                }
            }

            if (!authorToSave) {
                throw new GraphQLError(
                    `Saving author failed: could not resolve author`,
                    {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.author,
                        },
                    },
                );
            }

            const book = new Book({
                title,
                published,
                author: authorToSave,
                genres,
            });

            try {
                await book.save();
            } catch (error) {
                throw new GraphQLError(`Saving book failed: ${error.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title,
                        error,
                    },
                });
            }

            return book;
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    },
                });
            }

            let author;
            try {
                author = await Author.findOneAndUpdate(
                    { name: args.name },
                    { $set: { born: args.setBornTo } },
                    { returnDocument: 'after', runValidators: true },
                );
            } catch (error) {
                throw new GraphQLError(
                    `Saving author failed: ${error.message}`,
                    {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error,
                        },
                    },
                );
            }

            if (!author) {
                return null;
                // throw new GraphQLError(`Author '${args.name}' not found`, {
                //     extensions: {
                //         code: 'BAD_USER_INPUT',
                //         invalidArgs: args.name,
                //     },
                // });
            }

            return author;
        },
        createUser: async (root, args) => {
            const { username, favoriteGenre } = args;
            const user = new User({ username, favoriteGenre });

            try {
                await user.save();
            } catch (error) {
                throw new GraphQLError(`Saving user failed: ${error.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.username,
                    },
                });
            }
            return user;
        },
        login: async (root, args) => {
            const { username, password } = args;
            const user = await User.findOne({ username: username });

            if (!user || password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            const userForToken = {
                username: user.username,
                favoriteGenre: user.favoriteGenre,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        },
    },
    Author: {
        bookCount: async (root) => {
            const books = await Book.find({ author: root });
            return books.length;
        },
    },
};

module.exports = resolvers;
