import { useAnecdotes, useAnecdoteActions } from '../store';
import { useNotificationActions } from '../notificationStore';

const AnecdoteList = () => {
    const anecdotes = useAnecdotes();
    const { vote, deleteAnecdote } = useAnecdoteActions();
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
                            <button
                                onClick={() => {
                                    deleteAnecdote(anecdote.id);
                                    setNotification(
                                        `You deleted "${anecdote.content}"`,
                                    );
                                }}
                            >
                                delete
                            </button>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default AnecdoteList;
