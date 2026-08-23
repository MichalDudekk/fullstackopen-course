import { createContext } from 'react';
import { useState, useEffect } from 'react';
import anecdoteService from '../services/anecdotes';

const AnecdoteContext = createContext();

export default AnecdoteContext;

export const AnecdoteContextProvider = (props) => {
    const [anecdotes, setAnecdotes] = useState([]);

    useEffect(() => {
        anecdoteService.getAll().then((data) => setAnecdotes(data));
    }, []);

    return (
        <AnecdoteContext.Provider value={{ anecdotes, setAnecdotes }}>
            {props.children}
        </AnecdoteContext.Provider>
    );
};
