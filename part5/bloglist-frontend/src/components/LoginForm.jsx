import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({ addNotification, setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const newUser = await loginService.login({ username, password });
            setUser(newUser);
            window.localStorage.setItem(
                'blogsAppLoggedInUser',
                JSON.stringify(newUser),
            );

            setUsername('');
            setPassword('');

            blogService.setToken(newUser.token);
            navigate('/');
        } catch {
            addNotification('Wrong credentials', 5000);
        }
    };

    return (
        <>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        username
                        <input
                            type="text"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        password
                        <input
                            type="text"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </label>
                </div>
                <button type="submit">login</button>
            </form>
        </>
    );
};

export default LoginForm;
