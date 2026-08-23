import { useState, useEffect } from 'react';
import anecdoteService from '../services/anecdotes';

export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => setValue(event.target.value);

    const reset = () => setValue('');

    return { value, type, onChange, reset };
};

export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([]);

    useEffect(() => {
        anecdoteService.getAll().then((data) => setAnecdotes(data));
    }, []);

    const addAnecdote = async (anecdote) => {
        try {
            const savedAnecdote = await anecdoteService.createNew(anecdote);
            setAnecdotes(anecdotes.concat(savedAnecdote));
        } catch (error) {
            console.log(error); // primitive
        }
    };

    return { anecdotes, addAnecdote };
};
