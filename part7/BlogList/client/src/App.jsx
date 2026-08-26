import { useState, useEffect } from 'react';
import { Routes, Route, Link, useMatch } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import blogService from './services/blogs';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { useNotificationDispatch } from './hooks/useNotification';
import { useBlogs } from './hooks/useBlogs';

const App = () => {
    const result = useBlogs();
    const blogs = result.blogs;
    const setBlogs = (x) => console.log(x);

    const setNotification = useNotificationDispatch();

    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     blogService
    //         .getAll()
    //         .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
    // }, []);

    useEffect(() => {
        const newUserStringify = window.localStorage.getItem(
            'blogsAppLoggedInUser'
        );

        if (newUserStringify) {
            const newUser = JSON.parse(newUserStringify);
            setUser(newUser);
            blogService.setToken(newUser.token);
        }
    }, []);

    const match = useMatch('/blogs/:id');

    const addNotification = (content, type, time = 5000) => {
        setNotification({ query: 'SET', payload: content, type: type });
        setTimeout(() => {
            setNotification({ query: 'CLEAR' });
        }, time);
    };

    const addNewBlog = async (blog) => {
        if (!user) {
            addNotification('you have to be logged in', 'error');
            return;
        }

        try {
            const newBlog = await blogService.postBlog(blog);
            setBlogs(blogs.concat(newBlog));
            addNotification('poprawnie dodano blog', 'success');
        } catch (e) {
            addNotification(e.data, 'error');
        }
    };

    const handleLike = async (blog) => {
        if (!user) {
            addNotification('you have to be logged in', 'error');
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
                    blog.id !== updatedBlog.id ? blog : updatedBlog
                )
            );
            addNotification('dodano like', 'success');
        } catch (e) {
            addNotification(e.data, 'error');
        }
    };

    const handleRemoveBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                await blogService.deleteBlog(blog);

                setBlogs(
                    blogs.filter((singleBlog) => singleBlog.id !== blog.id)
                );
                addNotification('usunieto bloga', 'success');
            } catch (e) {
                addNotification(e.data, 'error');
            }
        }
    };

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem('blogsAppLoggedInUser');
    };

    const inputStyle = {
        textDecoration: 'none',
        color: 'white',
    };

    if (result.isError) {
        return <>BlogList not available due to server problems</>;
    }

    if (result.isPending) {
        return <>Pennding</>;
    }

    const blog = match
        ? blogs.find((note) => note.id === match.params.id)
        : null;

    return (
        <>
            <AppBar position="static" sx={{ display: 'flex' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        MUI
                    </Typography>

                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button color="inherit">
                            <Link to="/" style={inputStyle}>
                                blogs
                            </Link>
                        </Button>
                        {user && (
                            <Button color="inherit">
                                <Link to="/create" style={inputStyle}>
                                    new blog
                                </Link>
                            </Button>
                        )}

                        {!user ? (
                            <Button color="inherit">
                                <Link style={inputStyle} to="/login">
                                    login
                                </Link>
                            </Button>
                        ) : (
                            <Button color="inherit" onClick={handleLogout}>
                                logout
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Notification />
            <ErrorBoundary>
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
                        path="/create"
                        element={<BlogForm addNewBlog={addNewBlog} />}
                    />
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
                    <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                </Routes>
            </ErrorBoundary>
        </>
    );
};

export default App;
