import { useNavigate } from 'react-router-dom';

const Blog = ({ blog, handleLike, user, handleRemoveBlog }) => {
    const navigate = useNavigate();

    const removeBlog = () => {
        handleRemoveBlog();
        navigate('/');
    };

    if (!blog) {
        return null;
    }

    return (
        <div>
            <h3>{blog.title}</h3>
            <span>
                <a href="https://fullstackopen.com/" target="_blanc">
                    {blog.url}
                </a>
            </span>
            <br />
            <span>{blog.author}</span>
            <br />
            <span>likes {blog.likes} </span>
            {user && <button onClick={handleLike}>like</button>}
            <br />
            <span>Added by {blog.user.name}</span>
            <br />
            {user && user.username === blog.user.username && (
                <button onClick={removeBlog}>remove</button>
            )}
        </div>
    );
};

export default Blog;
