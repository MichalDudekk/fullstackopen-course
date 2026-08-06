import { useState, useEffect, useRef } from 'react';
import Note from './Note';
import noteService from '../services/notes';
import Notification from './Notification';
import loginService from '../services/login';
import LoginForm from './LoginForm';
import NoteForm from './NoteForm';
import Togglable from './Togglable';

const NoteList = ({ initialNotes }) => {
    const [notes, setNotes] = useState(initialNotes);
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState('some error happened...');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    // const noteFormRef = useRef();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const loggedInUser = await loginService.login({
                username,
                password,
            });

            window.localStorage.setItem(
                'loggedNoteappUser',
                JSON.stringify(loggedInUser),
            );

            noteService.setToken(loggedInUser.token);
            setUser(loggedInUser);
            setUsername('');
            setPassword('');
        } catch {
            setErrorMessage('wrong credentials');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    // const createNote = async (noteObject) => {
    //     const response = await noteService.create(noteObject);
    //     setNotes(notes.concat(response));
    //     noteFormRef.current.toggleVisibility();
    // };

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important === true);

    const toggleImportanceOf = (id) => {
        const note = notes.find((n) => n.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote)
            .then((response) => {
                setNotes(
                    notes.map((note) => (note.id === id ? response : note)),
                );
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`,
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                setNotes(notes.filter((n) => n.id !== id));
            });
    };

    if (!notes) {
        return null;
    }

    const loginForm = () => (
        <Togglable buttonLabel="login">
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
            />
        </Togglable>
    );

    // const noteForm = () => (
    //     <Togglable buttonLabel="new note" ref={noteFormRef}>
    //         <NoteForm createNote={createNote} />
    //     </Togglable>
    // );

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />

            {!user && loginForm()}
            {user && (
                <div>
                    <p>{user.name} logged in</p>
                    {/* {noteForm()} */}
                </div>
            )}

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default NoteList;
