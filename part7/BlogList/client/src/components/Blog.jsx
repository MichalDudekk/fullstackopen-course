import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    CardContent,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';

const Blog = ({ blog, handleLike, user, handleRemoveBlog, addComment }) => {
    const navigate = useNavigate();
    const [newComment, setNewComment] = useState('');

    const removeBlog = () => {
        handleRemoveBlog();
        navigate('/');
    };

    const handleAddComment = (event) => {
        event.preventDefault();
        addComment(newComment);
        setNewComment('');
    };

    if (!blog) {
        return null;
    }

    const margin = {
        margin: '5px 5px 5px 0',
    };

    return (
        <Card style={{ marginTop: 20 }}>
            <CardContent>
                <Typography variant="h4" component="div">
                    {blog.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    by {blog.author}
                </Typography>
                <Typography variant="body2">
                    <a href="https://fullstackopen.com/" target="_blanc">
                        {blog.url}
                    </a>
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                    Added by {blog.user.name}
                </Typography>
                <Typography>
                    <b style={margin}>{blog.likes} likes</b>
                    {user && (
                        <Button
                            onClick={handleLike}
                            variant="outlined"
                            style={margin}
                        >
                            like
                        </Button>
                    )}
                    {user && user.username === blog.user.username && (
                        <Button
                            onClick={removeBlog}
                            variant="outlined"
                            color="error"
                            style={margin}
                        >
                            remove
                        </Button>
                    )}
                </Typography>
                <br />
                <Typography variant="h5">comments</Typography>

                <form onSubmit={handleAddComment}>
                    <TextField
                        label="add a comment"
                        value={newComment}
                        onChange={({ target }) => setNewComment(target.value)}
                        // variant="standard"
                        size="small"
                        disabled={user ? false : true}
                    />
                    {user && (
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ marginLeft: 10 }}
                            sx={{ height: 40 }}
                        >
                            add comment
                        </Button>
                    )}
                </form>

                <br />

                {blog.comments.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        No comments yet.
                    </Typography>
                ) : (
                    <List disablePadding>
                        {blog.comments.map((comment, index) => (
                            <ListItem
                                key={`${comment}${index}`}
                                disableGutters
                                sx={{
                                    py: 1,
                                    px: 2,
                                    mb: 1,
                                    backgroundColor: 'grey.50',
                                    borderLeft: '3px solid',
                                    borderColor: 'primary.light',
                                    borderRadius: 1,
                                }}
                            >
                                <ListItemText
                                    primary={comment}
                                    primaryTypographyProps={{
                                        variant: 'body2',
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </CardContent>
        </Card>
    );
};

export default Blog;
