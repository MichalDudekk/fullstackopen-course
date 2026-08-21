import { useAnecdoteActions } from '../store';
import { useContext } from 'react';
import NotificationContext from '../NotificationContext';

const AnecdoteForm = () => {
    const { addAnecdote } = useAnecdoteActions();
    const { addNotification } = useContext(NotificationContext);

    const handleAddAnecdote = (e) => {
        e.preventDefault();
        const content = e.target.content.value;
        addAnecdote(content);
        addNotification(`You added "${content}"`);
        e.target.reset();
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleAddAnecdote}>
                <div>
                    <input name="content" />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    );
};

export default AnecdoteForm;
