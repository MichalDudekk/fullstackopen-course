import { useState } from 'react';
import { useApolloClient } from '@apollo/client/react';

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

    const onLogout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    const notify = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 5000);
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
                    <button onClick={() => setPage('recomended')}>
                        recomended
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

            <Recomended show={page === 'recomended'} />

            <Login
                show={page === 'login'}
                setToken={setToken}
                setError={notify}
            />
        </div>
    );
};

export default App;
