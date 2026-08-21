import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getAnecdotes,
    createAnecdote,
    updateAnecdote,
} from '../services/anecdotes';
import { useNotification } from './useNotification';

export const useAnecdotes = () => {
    const client = useQueryClient();
    const { addNotification } = useNotification();

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 1,
    });

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = client.getQueryData(['anecdotes']);
            client.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
            addNotification(`You added "${newAnecdote.content}"`);
        },
        onError: (e) => {
            addNotification(e.message);
        },
    });

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = client.getQueryData(['anecdotes']);
            client.setQueryData(
                ['anecdotes'],
                anecdotes.map((anecdote) =>
                    anecdote.id === updatedAnecdote.id
                        ? updatedAnecdote
                        : anecdote,
                ),
            );
        },
    });

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        isError: result.isError,
        createAnecdote: (content) => {
            newAnecdoteMutation.mutate({ content, votes: 0 });
        },
        updateAnecdote: (updatedAnecdote) =>
            updateAnecdoteMutation.mutate(updatedAnecdote),
    };
};
