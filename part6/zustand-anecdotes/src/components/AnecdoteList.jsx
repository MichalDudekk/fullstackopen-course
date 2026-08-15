import { useAnecdotes, useAnecdoteActions } from '../store';
import { useNotificationActions } from '../notificationStore';

const AnecdoteList = () => {
    const anecdotes = useAnecdotes();
    const { vote } = useAnecdoteActions();
    const { setNotification } = useNotificationActions();

    return (
        <>
            {anecdotes
                .toSorted((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button
                                onClick={() => {
                                    vote(anecdote.id);
                                    setNotification(
                                        `You voted "${anecdote.content}"`,
                                    );
                                }}
                            >
                                vote
                            </button>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default AnecdoteList;
