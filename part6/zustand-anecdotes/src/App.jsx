import { useEffect } from 'react';
import { useAnecdoteActions } from './store';
import { useNotification } from './notificationStore';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
    const notification = useNotification();
    const { initialize } = useAnecdoteActions();

    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification notification={notification} />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;
