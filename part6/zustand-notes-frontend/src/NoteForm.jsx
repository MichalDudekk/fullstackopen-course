import { useNoteActions } from './store';

const NoteForm = () => {
    const { add } = useNoteActions();

    const addNote = async (e) => {
        e.preventDefault();
        const content = e.target.noteInput.value;
        add(content);
        e.target.reset();
    };

    return (
        <form onSubmit={addNote}>
            <input
                name="noteInput"
                autoComplete="new-password" // so chrome doesnt think its a payment card input
            />
            <button type="submit">add</button>
        </form>
    );
};

export default NoteForm;
