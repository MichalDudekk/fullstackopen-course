import { Link } from 'react-router-dom';
import { useBlogs } from '../hooks/useBlogs';
import {
    Card,
    CardContent,
    List,
    ListItemButton,
    ListItemText,
    Typography,
    Divider,
} from '@mui/material';

const BlogList = () => {
    const result = useBlogs();

    if (result.isPending) return null;

    if (result.isError) return <>Error</>;

    const blogs = result.blogs.toSorted(
        (blogA, blogB) => blogB.likes - blogA.likes
    );

    return (
        <Card elevation={2} sx={{ mx: 'auto', mt: 4, borderRadius: 3 }}>
            <CardContent>
                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight={700}
                    gutterBottom
                >
                    Blogs
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <List disablePadding>
                    {blogs.map((blog, index) => (
                        <ListItemButton
                            key={blog.id}
                            component={Link}
                            to={`/blogs/${blog.id}`}
                            divider={index !== blogs.length - 1}
                            sx={{
                                borderRadius: 2,
                                my: 0.5,
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                        >
                            <ListItemText
                                primary={blog.title}
                                primaryTypographyProps={{ fontWeight: 500 }}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default BlogList;
