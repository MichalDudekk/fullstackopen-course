import { render, screen } from '@testing-library/react';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm />', async () => {
    // given
    const addNewBlog = vi.fn();
    const user = userEvent.setup();
    render(<BlogForm addNewBlog={addNewBlog} />);
    const title = screen.getByLabelText('title:');
    const author = screen.getByLabelText('author:');
    const url = screen.getByLabelText('url:');
    const submit = screen.getByText('create');

    // when
    await user.type(title, 'Adventures');
    await user.type(author, 'Bard JK');
    await user.type(url, 'https://Aventures.url.com');
    await user.click(submit);

    // then
    expect(addNewBlog.mock.calls).toHaveLength(1);
    expect(addNewBlog.mock.calls[0][0]).toStrictEqual({
        title: 'Adventures',
        author: 'Bard JK',
        url: 'https://Aventures.url.com',
    });
});
