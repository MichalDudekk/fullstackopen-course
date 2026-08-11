import NoteForm from './NoteForm';
import NoteList from './NoteList';
import VisibilityFilter from './VisibilityFilter';
import { useEffect } from 'react';
import noteService from './services/notes';
import { useNoteActions } from './store';

const App = () => {
    const { initialize } = useNoteActions();

    useEffect(() => {
        noteService.getAll().then((notes) => initialize(notes));
    }, [initialize]);
    return (
        <div>
            <NoteForm />
            <VisibilityFilter />
            <NoteList />
        </div>
    );
};

export default App;
