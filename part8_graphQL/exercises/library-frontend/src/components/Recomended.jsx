// import { useState } from 'react';

import { useQuery } from '@apollo/client/react';
import { ALL_BOOKS, ME } from '../queries';

const Recomended = (props) => {
    const result = useQuery(ALL_BOOKS);
    const resultUser = useQuery(ME);

    if (result.loading || resultUser.loading) {
        return null;
    }

    if (!props.show) {
        return null;
    }

    const books = result.data.allBooks;
    const user = resultUser.data.me;

    return (
        <div>
            <h2>books</h2>

            <p>
                books in your favorite genre <b>{user.favoriteGenre}</b>
            </p>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books
                        .filter((book) =>
                            book.genres.includes(user.favoriteGenre),
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
        </div>
    );
};

export default Recomended;
