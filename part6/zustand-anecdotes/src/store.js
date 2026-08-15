import { create } from 'zustand';
import anecdoteService from './services/anecdotes.js';

const useAnecdoteStore = create((set, get) => ({
    anecdotes: [],
    filter: '',
    actions: {
        vote: async (anecdoteId) => {
            const currentAnecdote = get().anecdotes.find(
                (anecdote) => anecdote.id === anecdoteId,
            );
            const savedAnecdote = await anecdoteService.update(anecdoteId, {
                ...currentAnecdote,
                votes: currentAnecdote.votes + 1,
            });
            set((state) => ({
                anecdotes: state.anecdotes.map((anecdote) =>
                    anecdote.id === anecdoteId ? savedAnecdote : anecdote,
                ),
            }));
        },
        addAnecdote: async (anecdote) => {
            const savedAnecdote = await anecdoteService.createNew(anecdote);
            set((state) => ({
                anecdotes: [...state.anecdotes, savedAnecdote],
            }));
        },
        deleteAnecdote: async (id) => {
            await anecdoteService.deleteById(id);
            const anecdotes = get().anecdotes.filter(
                (anecdote) => anecdote.id !== id,
            );
            set(() => ({ anecdotes }));
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

export default useAnecdoteStore;
