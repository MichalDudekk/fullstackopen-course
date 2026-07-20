import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
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
            alert('Wrong credentials');
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
            {`${user.name} is logged in`}
            <h2>blogs</h2>{' '}
            <button
                onClick={() => {
                    setUser(null);
                    window.localStorage.removeItem('blogsAppLoggedInUser');
                }}
            >
                logout
            </button>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );

    return (
        <>
            {!user && loginForm()}
            {user && blogList()}
        </>
    );
};

export default App;
