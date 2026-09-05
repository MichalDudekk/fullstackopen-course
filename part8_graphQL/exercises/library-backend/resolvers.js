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
            const authorInDb = await Author.findOne({ name: author });

            if (!authorInDb) {
                authorToSave = new Author({ name: author });
            } else {
                authorToSave = authorInDb;
            }

            const book = new Book({
                title,
                published,
                author: authorToSave,
                genres,
            });

            try {
                await book.save();
                await authorToSave.save();
            } catch (error) {
                throw new GraphQLError(
                    `Saving book or author failed: ${error.message}`,
                    {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error,
                        },
                    },
                );
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

            const author = await Author.findOne({ name: args.name });

            if (!author) {
                throw new GraphQLError(`Author '${args.name}' not found`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                    },
                });
            }

            author.born = args.setBornTo;
            try {
                await author.save();
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
