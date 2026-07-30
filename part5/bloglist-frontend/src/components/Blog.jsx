import { useState } from 'react';

const Blog = ({ blog, handleLike, user, handleRemoveBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => setVisible(!visible);

    return (
        <div style={blogStyle}>
            <div>
                <span>{blog.title}</span> <span>{blog.author}</span>
                <button onClick={toggleVisibility}>
                    {visible ? 'hide' : 'view'}
                </button>
            </div>
            {visible && (
                <div>
                    <span>{blog.url}</span>
                    <br />
                    <span>likes {blog.likes} </span>
                    <button onClick={handleLike}>like</button>
                    <br />
                    {blog.user.name}
                    <br />
                    {user.username === blog.user.username && (
                        <button onClick={handleRemoveBlog}>remove</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Blog;
