// import { useState } from 'react';
import { Routes, Route, Link, useMatch } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { useAddNotification } from './hooks/useNotification';
import { useBlogs } from './hooks/useBlogs';
import { useUser } from './hooks/useUser';

const App = () => {
    const result = useBlogs();
    const blogs = result.blogs;

    const match = useMatch('/blogs/:id');

    const addNotification = useAddNotification();

    const { user, logoutUser } = useUser();

    const handleLike = async (blog) => {
        if (!user) {
            addNotification('you have to be logged in', 'error');
            return;
        }

        try {
            result.updateBlog({
                ...blog,
                user: blog.user.id,
                likes: blog.likes + 1,
            });

            addNotification('dodano like', 'success');
        } catch (e) {
            addNotification(e.data, 'error');
        }
    };

    const handleRemoveBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                result.deleteBlog(blog);
                addNotification('usunieto bloga', 'success');
            } catch (e) {
                addNotification(e.data, 'error');
            }
        }
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
                            <Button color="inherit" onClick={logoutUser}>
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
                            <LoginForm addNotification={addNotification} />
                        }
                    />
                    <Route path="/" element={<BlogList />} />
                    <Route
                        path="/create"
                        element={<BlogForm createBlog={result.createBlog} />}
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
