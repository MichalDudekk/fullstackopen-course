import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { ADD_BOOK, ALL_BOOKS } from '../queries';

// import { addBookToCache } from '../utils/apolloCache';

const NewBook = (props) => {
    const [title, setTitle] = useState('Testbook');
    const [author, setAuthor] = useState('Scroge');
    const [published, setPublished] = useState('1972');
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState(['fantasy']);

    const [addBook] = useMutation(ADD_BOOK, {
        refetchQueries: [
            'allAuthors',
            { query: ALL_BOOKS, variables: { genre: null } },
            ...genres.map((genre) => ({
                query: ALL_BOOKS,
                variables: {
                    genre: genre,
                },
            })),
        ],
    });

    if (!props.show) {
        return null;
    }

    const submit = async (event) => {
        event.preventDefault();

        addBook({
            variables: { title, author, published: Number(published), genres },
        });

        setTitle('');
        setPublished('');
        setAuthor('');
        setGenres([]);
        setGenre('');
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre('');
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <label>
                        title
                        <input
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        author
                        <input
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        published
                        <input
                            type="number"
                            value={published}
                            onChange={({ target }) =>
                                setPublished(target.value)
                            }
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            value={genre}
                            onChange={({ target }) => setGenre(target.value)}
                        />
                        <button onClick={addGenre} type="button">
                            add genre
                        </button>
                    </label>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    );
};

export default NewBook;
