import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { Container } from '@mui/material';

let handleLike;
let handleRemoveBlog;

const primitiveUser = { username: 'Neandertalis' };
const author = {
    username: 'MJ',
    name: 'Mike',
};

const blog = {
    title: 'Some title here',
    author: 'Ivan Ivanovic',
    likes: 5,
    url: 'https://blog.ai',
    user: author,
};

describe('<Blog />', () => {
    test('Blog information and the number of likes are displayed to unauthenticated users, buttons are not displayed', () => {
        render(
            <Container>
                <Router>
                    <Blog
                        blog={blog}
                        user={null}
                        handleLike={handleLike}
                        handleRemoveBlog={handleRemoveBlog}
                    />
                </Router>
            </Container>,
        );

        const title = screen.getByText('Some title here');
        const author = screen.getByText('by Ivan Ivanovic');
        const likes = screen.getByText('5 likes');
        const url = screen.getByText('https://blog.ai');

        expect(title).toBeVisible();
        expect(author).toBeVisible();
        expect(likes).toBeVisible();
        expect(url).toBeVisible();

        const likeButton = screen.queryByText('like');
        const removeButton = screen.queryByText('remove');

        expect(likeButton).toBeNull();
        expect(removeButton).toBeNull();
    });

    test('Authenticated users who are not the blog’s creator are shown only the like button', async () => {
        render(
            <Router>
                <Blog
                    blog={blog}
                    user={primitiveUser}
                    handleLike={handleLike}
                    handleRemoveBlog={handleRemoveBlog}
                />
            </Router>,
        );

        const likeButton = screen.getByText('like');
        const removeButton = screen.queryByText('remove');

        expect(likeButton).toBeVisible();
        expect(removeButton).toBeNull();
    });

    test('Blog’s creator is also shown the delete button', async () => {
        render(
            <Router>
                <Blog
                    blog={blog}
                    user={author}
                    handleLike={handleLike}
                    handleRemoveBlog={handleRemoveBlog}
                />
            </Router>,
        );

        const likeButton = screen.getByText('like');
        const removeButton = screen.getByText('remove');

        expect(likeButton).toBeVisible();
        expect(removeButton).toBeVisible();
    });
});
