import { useAnecdoteActions } from '../store';
import { useNotificationActions } from '../notificationStore';

const AnecdoteForm = () => {
    const { addAnecdote } = useAnecdoteActions();
    const { setNotification } = useNotificationActions();

    const handleAddAnecdote = (e) => {
        e.preventDefault();
        const content = e.target.content.value;
        addAnecdote(content);
        setNotification(`You added "${content}"`);
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
