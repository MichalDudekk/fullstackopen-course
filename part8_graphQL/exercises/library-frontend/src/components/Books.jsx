import { useState } from 'react';

import { useQuery } from '@apollo/client/react';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
    const result = useQuery(ALL_BOOKS);
    const [genreFilter, setGenreFilter] = useState(null);

    if (result.loading) {
        return null;
    }

    if (!props.show) {
        return null;
    }

    const books = result.data.allBooks;
    const allGenres = books.map((book) => book.genres).flat();
    const uniqueGenres = [...new Set(allGenres)];

    return (
        <div>
            <h2>books</h2>

            {genreFilter && (
                <p>
                    in genre <b>{genreFilter}</b>
                </p>
            )}

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books
                        .filter((book) =>
                            genreFilter
                                ? book.genres.includes(genreFilter)
                                : true,
                        )
                        .map((a) => (
                            <tr key={a.id}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {uniqueGenres.map((genre) => (
                <button key={genre} onClick={() => setGenreFilter(genre)}>
                    {genre}
                </button>
            ))}
            <button onClick={() => setGenreFilter(null)}>all genres</button>
        </div>
    );
};

export default Books;
