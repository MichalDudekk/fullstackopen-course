import { useNoteActions } from './store';
import noteService from './services/notes';

const NoteForm = () => {
    const { add } = useNoteActions();

    const addNote = async (e) => {
        e.preventDefault();
        const content = e.target.note.value;
        const newNote = await noteService.createNew(content);
        add(newNote);
        e.target.reset();
    };

    return (
        <form onSubmit={addNote}>
            <input name="note" />
            <button type="submit">add</button>
        </form>
    );
};

export default NoteForm;
