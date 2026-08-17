import { useQuery } from '@tanstack/react-query';
import { getAnecdotes } from '../services/anegdotes';

export const useAnecdotes = () => {
    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 1,
    });

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        isError: result.isError,
    };
};
