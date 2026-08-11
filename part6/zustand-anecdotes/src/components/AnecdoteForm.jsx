import { useAnecdoteActions } from '../store';

const AnecdoteForm = () => {
    const { addAnecdote } = useAnecdoteActions();

    const handleAddAnecdote = (e) => {
        e.preventDefault();
        const content = e.target.content.value;
        addAnecdote(content);
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
