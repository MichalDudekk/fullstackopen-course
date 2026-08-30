import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { useUser } from '../hooks/useUser';
import { useAddNotification } from '../hooks/useNotification';
import { useField } from '../hooks/useField';
import { Typography } from '@mui/material';

const BlogForm = ({ createBlog }) => {
    const { reset: resetTitle, ...title } = useField();
    const { reset: resetAuthor, ...author } = useField();
    const { reset: resetUrl, ...url } = useField();

    const navigate = useNavigate();
    const { user } = useUser();
    const addNotification = useAddNotification();

    const handleNewBlog = async (event) => {
        event.preventDefault();

        if (!user) {
            addNotification('you have to be logged in', 'error');
            return;
        }

        try {
            await createBlog({
                title: title.value,
                author: author.value,
                url: url.value,
            });

            addNotification('poprawnie dodano blog', 'success');
            navigate('/');
            resetTitle();
            resetAuthor();
            resetUrl();
        } catch (e) {
            addNotification(e.response.data.error, 'error');
        }
    };

    return (
        <>
            <br />
            <Typography
                variant="h5"
                component="h2"
                fontWeight={700}
                gutterBottom
            >
                Create New
            </Typography>
            <form onSubmit={handleNewBlog}>
                <div>
                    <TextField label="title:" {...title} />
                </div>
                <div>
                    <TextField
                        label="author:"
                        {...author}
                        style={{ marginTop: 10 }}
                    />
                </div>
                <div>
                    <TextField
                        label="url:"
                        {...url}
                        style={{ marginTop: 10 }}
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    style={{ marginTop: 10 }}
                >
                    create
                </Button>
            </form>
        </>
    );
};

export default BlogForm;
