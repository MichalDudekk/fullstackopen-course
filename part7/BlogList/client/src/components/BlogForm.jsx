import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { useUser } from '../hooks/useUser';
import { useAddNotification } from '../hooks/useNotification';

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const navigate = useNavigate();
    const { user } = useUser();
    const addNotification = useAddNotification();

    const handleNewBlog = async (event) => {
        event.preventDefault();

        if (!user) {
            addNotification('you have to be logged in', 'error');
            return;
        }

        try {
            await createBlog({ title, author, url });

            addNotification('poprawnie dodano blog', 'success');
            navigate('/');
            setTitle('');
            setAuthor('');
            setUrl('');
        } catch (e) {
            addNotification(e.response.data.error, 'error');
        }
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleNewBlog}>
                <div>
                    <TextField
                        value={title}
                        label="title:"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        value={author}
                        label="author:"
                        onChange={({ target }) => setAuthor(target.value)}
                        style={{ marginTop: 10 }}
                    />
                </div>
                <div>
                    <TextField
                        value={url}
                        label="url:"
                        onChange={({ target }) => setUrl(target.value)}
                        style={{ marginTop: 10 }}
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    style={{ marginTop: 10 }}
                >
                    create
                </Button>
            </form>
        </>
    );
};

export default BlogForm;
