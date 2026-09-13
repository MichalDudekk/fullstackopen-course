import { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/client/react';
import { LOGIN } from '../queries';

const Login = ({ setToken, setError, show, afterLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const client = useApolloClient();

    const [login] = useMutation(LOGIN, {
        onCompleted: async (data) => {
            const token = data.login.value;
            setToken(token);
            localStorage.setItem('library-user-token', token);
            await client.resetStore();
        },
        onError: (error) => {
            setError(`login failed: ${error.message}`);
        },
    });

    if (!show) {
        return null;
    }

    const submit = async (event) => {
        event.preventDefault();

        try {
            await login({ variables: { username, password } });
            afterLogin();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <label>
                        username{' '}
                        <input
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        password{' '}
                        <input
                            type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </label>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default Login;
