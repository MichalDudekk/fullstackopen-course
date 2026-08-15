import { create } from 'zustand';
import noteService from './services/notes';

const useNoteStore = create((set, get) => ({
    notes: [],
    filter: 'all',
    actions: {
        add: async (content) => {
            const newNote = await noteService.createNew(content);
            set((state) => ({ notes: state.notes.concat(newNote) }));
        },
        toggleImportance: async (noteId) => {
            const currentNote = get().notes.find((note) => note.id === noteId);
            const updatedNote = await noteService.update(noteId, {
                ...currentNote,
                important: !currentNote.important,
            });
            set((state) => ({
                notes: state.notes.map((note) =>
                    note.id === noteId ? updatedNote : note,
                ),
            }));
        },
        setFilter: (value) => set(() => ({ filter: value })),
        initialize: async () => {
            const notes = await noteService.getAll();
            set(() => ({ notes }));
        },
    },
}));

export const useNotes = () => {
    const notes = useNoteStore((state) => state.notes);
    const filter = useNoteStore((state) => state.filter);
    if (filter === 'important') return notes.filter((n) => n.important);
    if (filter === 'nonimportant') return notes.filter((n) => !n.important);
    return notes;
};
export const useNoteActions = () => useNoteStore((state) => state.actions);
