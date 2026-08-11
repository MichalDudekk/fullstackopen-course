import { create } from 'zustand';

const useNoteStore = create((set) => ({
    notes: [],
    actions: {
        add: (note) => set((state) => ({ notes: state.notes.concat(note) })),
        toggleImportance: (noteId) =>
            set((state) => ({
                notes: state.notes.map((note) =>
                    note.id === noteId
                        ? { ...note, important: !note.important }
                        : note,
                ),
            })),
    },
}));

export const useNotes = () => useNoteStore((state) => state.notes);
export const useNoteActions = () => useNoteStore((state) => state.actions);
