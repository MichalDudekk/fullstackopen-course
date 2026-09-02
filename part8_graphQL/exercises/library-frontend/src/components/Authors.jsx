import { useQuery, useMutation } from '@apollo/client/react';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

import { useState } from 'react';

const Authors = (props) => {
    const [name, setName] = useState('');
    const [born, setBorn] = useState('');

    const result = useQuery(ALL_AUTHORS);
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        onCompleted: (data) => {
            if (!data.editAuthor) {
                console.log('author not found');
            }
        },
    });

    if (result.loading) {
        return null;
    }

    if (!props.show) {
        return null;
    }

    const authors = result.data.allAuthors;

    const handleEditAuthor = (event) => {
        event.preventDefault();

        editAuthor({ variables: { name, setBornTo: Number(born) } });
    };

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Set birthyear</h2>
            <form onSubmit={handleEditAuthor}>
                <label>
                    name
                    <select
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    >
                        <option value="" disabled>
                            --Select author--
                        </option>
                        {authors.map((author) => {
                            return (
                                <option value={author.name} key={author.id}>
                                    {author.name}
                                </option>
                            );
                        })}
                        <option value="someOption">Some option</option>
                    </select>
                </label>
                <br />
                <label>
                    born
                    <input
                        type="text"
                        value={born}
                        onChange={(event) => setBorn(event.target.value)}
                    />
                </label>
                <br />
                <button>update author</button>
            </form>
        </div>
    );
};

export default Authors;
