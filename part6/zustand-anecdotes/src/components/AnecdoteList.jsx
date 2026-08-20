import { useAnecdotes, useAnecdoteActions } from '../store';
import { useContext } from 'react';
import NotificationContext from '../NotificationContext';

const AnecdoteList = () => {
    const anecdotes = useAnecdotes();
    const { vote, deleteAnecdote } = useAnecdoteActions();
    const { addNotification } = useContext(NotificationContext);

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
                                    addNotification(
                                        `You voted "${anecdote.content}"`,
                                    );
                                }}
                            >
                                vote
                            </button>
                            <button
                                onClick={() => {
                                    deleteAnecdote(anecdote.id);
                                    addNotification(
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
