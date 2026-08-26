import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const BlogForm = ({ addNewBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const navigate = useNavigate();

    const handleNewBlog = (event) => {
        event.preventDefault();

        addNewBlog({ title, author, url });
        navigate('/');
        setTitle('');
        setAuthor('');
        setUrl('');
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
