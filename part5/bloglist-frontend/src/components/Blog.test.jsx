import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
    beforeEach(() => {
        const blog = {
            title: 'Some title here',
            author: 'Ivan Ivanovic',
            likes: 5,
            url: 'https://blog.ai',
            user: {
                username: 'MJ',
                name: 'Mike',
            },
        };

        const primitiveUser = { username: 'Neandertalis' };

        const handleLike = vi.fn();
        const handleRemoveBlog = vi.fn();

        render(
            <Blog
                blog={blog}
                user={primitiveUser}
                handleLike={handleLike}
                handleRemoveBlog={handleRemoveBlog}
            />,
        );
    });

    test('blog renders title and author and not render URL or likes by default', () => {
        const title = screen.getByText('Some title here');
        const author = screen.getByText('Ivan Ivanovic');
        const likes = screen.queryByText('5');
        const url = screen.queryByText('https://blog.ai');

        expect(title).toBeVisible();
        expect(author).toBeVisible();
        expect(likes).toBeNull();
        expect(url).toBeNull();
    });

    test('URL and likes are visible after clicking the button', async () => {
        // given
        const user = userEvent.setup();
        const button = screen.getByText('view');

        // when
        await user.click(button);

        // then
        const url = screen.getByText('https://blog.ai');
        const likes = screen.getByText('likes 5');

        expect(url).toBeVisible();
        expect(likes).toBeVisible();
    });
});
