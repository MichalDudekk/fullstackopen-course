import { useState, useEffect } from 'react';
import { Routes, Route, Link, useMatch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import blogService from './services/blogs';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [notification, setNotification] = useState('');

    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService
            .getAll()
            .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
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

    const match = useMatch('/blogs/:id');
    const blog = match
        ? blogs.find((note) => note.id === match.params.id)
        : null;

    const addNotification = (content, time = 5000) => {
        setNotification(content);
        setTimeout(() => {
            setNotification('');
        }, time);
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
        if (!user) {
            addNotification('you have to be logged in');
            return;
        }

        try {
            const updatedBlog = await blogService.putBlog({
                ...blog,
                user: blog.user.id,
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

    const handleRemoveBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                await blogService.deleteBlog(blog);

                setBlogs(
                    blogs.filter((singleBlog) => singleBlog.id !== blog.id),
                );
                addNotification('usunieto bloga');
            } catch (e) {
                addNotification(e.data);
            }
        }
    };

    const padding = {
        padding: 5,
    };

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
            <div>
                <Link style={padding} to="/">
                    blogs
                </Link>
                {!user ? (
                    <Link style={padding} to="/login">
                        login
                    </Link>
                ) : (
                    logoutButton()
                )}
            </div>
            <h1>
                <u>{notification}</u>
            </h1>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <LoginForm
                            setUser={setUser}
                            addNotification={addNotification}
                        />
                    }
                />
                <Route path="/" element={<BlogList blogs={blogs} />} />

                <Route
                    path="/blogs/:id"
                    element={
                        <Blog
                            blog={blog}
                            user={user}
                            handleLike={() => handleLike(blog)}
                            handleRemoveBlog={() => handleRemoveBlog(blog)}
                        />
                    }
                />
            </Routes>
            {/* 
            
            {user && (
                <p>
                    {user.name} is logged in {logoutButton()}
                </p>
            )}

            {user && blogForm()}
            {user && blogList()} */}
        </>
    );
};

export default App;
