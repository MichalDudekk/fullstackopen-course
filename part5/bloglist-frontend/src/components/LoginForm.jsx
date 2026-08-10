import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { TextField, Button } from '@mui/material';

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
            addNotification('Logged in successfully', 'success');
            navigate('/');
        } catch {
            addNotification('Wrong credentials', 'error', 5000);
        }
    };

    return (
        <>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <TextField
                        label="username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        variant="standard"
                    />
                </div>
                <div>
                    <TextField
                        label="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        variant="standard"
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    style={{ marginTop: 10 }}
                >
                    login
                </Button>
            </form>
        </>
    );
};

export default LoginForm;
