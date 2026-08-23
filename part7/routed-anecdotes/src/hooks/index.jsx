import { useState, useEffect, useContext } from 'react';
import AnecdoteContext from '../contexts/AnecdoteContext';
import anecdoteService from '../services/anecdotes';

export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => setValue(event.target.value);

    const reset = () => setValue('');

    return { value, type, onChange, reset };
};

export const useAnecdotes = () => {
    const { anecdotes, setAnecdotes } = useContext(AnecdoteContext);

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

    const deleteAnecdote = async (id) => {
        try {
            await anecdoteService.deleteById(id);
            setAnecdotes(anecdotes.filter((anecdote) => anecdote.id !== id));
        } catch (error) {
            console.log(error); // primitive
        }
    };

    return { anecdotes, addAnecdote, deleteAnecdote };
};
