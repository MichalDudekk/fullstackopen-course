import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { useUser } from '../hooks/useUser';
import { useAddNotification } from '../hooks/useNotification';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { loginUser } = useUser();
    const addNotification = useAddNotification();

    const handleLogin = async (event) => {
        event.preventDefault();

        const result = await loginUser(username, password);

        if (!result.ok) {
            addNotification('Wrong credentials', 'error', 5000);
            return;
        }

        setUsername('');
        setPassword('');

        navigate('/');
        addNotification('Logged in successfully', 'success');
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
