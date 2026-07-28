import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [notification, setNotification] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const newUserStringify = window.localStorage.getItem(
            'blogsAppLoggedInUser',
        );

        if (newUserStringify) {
            const newUser = JSON.parse(newUserStringify);
            setUser(newUser);
            blogService.setToken(newUser.token);
        }
    }, []);

    const addNotification = (content, time = 5000) => {
        setNotification(content);
        setTimeout(() => {
            setNotification('');
        }, time);
    };

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
        } catch {
            addNotification('Wrong credentials', 5000);
        }
    };

    const addNewBlog = async (blog) => {
        try {
            const newBlog = await blogService.postBlog(blog);
            setBlogs(blogs.concat(newBlog));
            addNotification('poprawnie dodano blog');
        } catch (e) {
            addNotification(e.data);
        }
    };

    const handleLike = async (blog) => {
        try {
            const updatedBlog = await blogService.putBlog({
                ...blog,
                likes: blog.likes + 1,
            });
            setBlogs(
                blogs.map((blog) =>
                    blog.id !== updatedBlog.id ? blog : updatedBlog,
                ),
            );
            addNotification('dodano like');
        } catch (e) {
            addNotification(e.data);
        }
    };

    const loginForm = () => (
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

    const blogList = () => (
        <div>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={() => handleLike(blog)}
                />
            ))}
        </div>
    );

    const blogForm = () => (
        <Togglable buttonLabel="create new note">
            <BlogForm addNewBlog={addNewBlog} />
        </Togglable>
    );

    const logoutButton = () => (
        <button
            onClick={() => {
                setUser(null);
                window.localStorage.removeItem('blogsAppLoggedInUser');
            }}
        >
            logout
        </button>
    );

    return (
        <>
            <h2>blogs</h2>
            <h1>
                <u>{notification}</u>
            </h1>
            {!user && loginForm()}
            {user && (
                <p>
                    {user.name} is logged in {logoutButton()}
                </p>
            )}

            {user && blogForm()}
            {user && blogList()}
        </>
    );
};

export default App;
