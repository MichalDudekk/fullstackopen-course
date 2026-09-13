import { ALL_BOOKS } from '../queries.js';

const updateCache = (allBooks, bookToAdd) => {
    const bookExist = allBooks.some((book) => book.id === bookToAdd.id);

    if (bookExist) {
        return { allBooks };
    }

    return {
        allBooks: allBooks.concat(bookToAdd),
    };
};

export const addBookToCache = (cache, bookToAdd) => {
    cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: null } },
        (prevCache) => {
            if (!prevCache) {
                console.log(prevCache);
                return prevCache;
            }

            const { allBooks } = prevCache;
            updateCache(allBooks, bookToAdd);
        },
    );

    bookToAdd.genres.forEach((genre) => {
        cache.updateQuery(
            { query: ALL_BOOKS, variables: { genre } },
            (prevCache) => {
                if (!prevCache) {
                    console.log(prevCache);
                    return prevCache;
                }

                const { allBooks } = prevCache;
                updateCache(allBooks, bookToAdd);
            },
        );
    });
};
