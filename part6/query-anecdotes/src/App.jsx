import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useAnecdotes } from './hooks/useAnecdotes';
import { useNotification } from './hooks/useNotification';

const App = () => {
    const result = useAnecdotes();
    const { addNotification } = useNotification();

    const handleVote = (anecdote) => {
        result.updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 });
        addNotification(`You voted "${anecdote.content}"`);
    };

    if (result.isError) {
        return <>anecdote service not available due to server problems</>;
    }

    if (result.isPending) {
        return <>Pennding</>;
    }

    const anecdotes = result.anecdotes;

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
