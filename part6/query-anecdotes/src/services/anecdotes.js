const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = async () => {
    const response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch notes');
    }
    return await response.json();
};

export const createAnecdote = async (anecdote) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(anecdote),
    };

    const response = await fetch(baseUrl, options);
    if (!response.ok) {
        throw new Error('Failed to fetch notes');
    }
    return await response.json();
};

export const updateAnecdote = async (anecdote) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(anecdote),
    };

    const response = await fetch(`${baseUrl}/${anecdote.id}`, options);
    if (!response.ok) {
        throw new Error('Failed to fetch notes');
    }
    return await response.json();
};
