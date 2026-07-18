import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';
import Footer from './components/Footer';
import loginService from './services/login';

const App = () => {
    const [notes, setNotes] = useState(null);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState('some error happened...');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        noteService.getAll().then((response) => {
            setNotes(response);
        });
    }, []);

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

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        };

        noteService.create(noteObject).then((response) => {
            setNotes(notes.concat(response));
            setNewNote('');
        });
    };

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

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
        <form onSubmit={handleLogin}>
            <div>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={({ target }) => {
                            setUsername(target.value);
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input
                        type="text"
                        value={password}
                        onChange={({ target }) => {
                            setPassword(target.value);
                        }}
                    />
                </label>
            </div>
            <button type="submit">login</button>
        </form>
    );

    const noteForm = () => (
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange} />
            <button type="submit">save</button>
        </form>
    );

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />

            {!user && loginForm()}
            {user && (
                <div>
                    <p>{user.name} logged in</p>
                    {noteForm()}
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
            <Footer />
        </div>
    );
};

export default App;
