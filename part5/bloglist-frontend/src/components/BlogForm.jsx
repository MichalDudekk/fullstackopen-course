import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
                    <label>
                        title:
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        author:
                        <input
                            type="text"
                            name="author"
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        url:
                        <input
                            type="text"
                            name="url"
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </label>
                </div>
                <button type="submit">create</button>
            </form>
        </>
    );
};

export default BlogForm;
