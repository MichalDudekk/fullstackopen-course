import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';

const Blog = ({ blog, handleLike, user, handleRemoveBlog }) => {
    const navigate = useNavigate();

    const removeBlog = () => {
        handleRemoveBlog();
        navigate('/');
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
            </CardContent>
        </Card>
    );
};

export default Blog;
