import { create } from 'zustand';
import anecdoteService from './services/anecdotes.js';

const useAnecdoteStore = create((set) => ({
    anecdotes: [],
    filter: '',
    actions: {
        vote: (id) =>
            set((state) => ({
                anecdotes: state.anecdotes.map((anecdote) =>
                    anecdote.id === id
                        ? { ...anecdote, votes: anecdote.votes + 1 }
                        : anecdote,
                ),
            })),
        addAnecdote: async (anecdote) => {
            const savedAnecdote = await anecdoteService.createNew(anecdote);
            set((state) => ({
                anecdotes: [...state.anecdotes, savedAnecdote],
            }));
        },
        setFilter: (newFilter) =>
            set(() => ({
                filter: newFilter,
            })),
        initialize: async () => {
            const anecdotes = await anecdoteService.getAll();
            set(() => ({ anecdotes }));
        },
    },
}));

export const useAnecdotes = () => {
    const anecdotes = useAnecdoteStore((state) => state.anecdotes);
    const filter = useAnecdoteStore((state) => state.filter);

    return anecdotes.filter(({ content }) => content.includes(filter));
};
export const useAnecdoteActions = () =>
    useAnecdoteStore((state) => state.actions);
