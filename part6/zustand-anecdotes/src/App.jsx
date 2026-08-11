import { useAnecdotes } from './store';
import { useAnecdoteActions } from './store';

const App = () => {
    const anecdotes = useAnecdotes();
    const { vote, addAnecdote } = useAnecdoteActions();

    const handleAddAnecdote = (e) => {
        e.preventDefault();
        const content = e.target.content.value;
        addAnecdote(content);
        e.target.reset();
    };

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
            <h2>create new</h2>
            <form onSubmit={handleAddAnecdote}>
                <div>
                    <input name="content" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default App;
