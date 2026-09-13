import { useState } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client/react';
import { ADD_BOOK, BOOK_ADDED } from './queries';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recomended from './components/Recomended';

const App = () => {
    const [token, setToken] = useState(
        localStorage.getItem('library-user-token'),
    );
    const [page, setPage] = useState('authors');
    const [notification, setNotification] = useState('');

    const client = useApolloClient();

    const notify = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 5000);
    };

    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            notify(`New book ${data.data.bookAdded.title}`);
        },
    });

    const onLogout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token && (
                    <button onClick={() => setPage('add')}>add book</button>
                )}
                {token && (
                    <button onClick={() => setPage('recommend')}>
                        recommend
                    </button>
                )}
                {!token && (
                    <button onClick={() => setPage('login')}>login</button>
                )}
                {token && <button onClick={onLogout}>logout</button>}
            </div>

            <div>
                <h2 style={{ color: 'red' }}>{notification}</h2>
            </div>

            <Authors show={page === 'authors'} token={token} />

            <Books show={page === 'books'} />

            <NewBook show={page === 'add'} />

            <Recomended show={page === 'recommend'} />

            <Login
                show={page === 'login'}
                setToken={setToken}
                setError={notify}
                afterLogin={() => setPage('authors')}
            />
        </div>
    );
};

export default App;
