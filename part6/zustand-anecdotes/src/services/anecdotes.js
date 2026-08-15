const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await fetch(baseUrl);

    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes');
    }

    return await response.json();
};

const createNew = async (content) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'Aplication/json' },
        body: JSON.stringify({ content, votes: 0 }),
    };

    const response = await fetch(baseUrl, options);

    if (!response.ok) {
        throw new Error('Failed to create an anecdote');
    }

    return await response.json();
};

const update = async (id, anecdote) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'Aplication/json' },
        body: JSON.stringify(anecdote),
    };

    const request = await fetch(`${baseUrl}/${id}`, options);

    if (!request.ok) {
        throw new Error('Failed to update anecdote');
    }

    return request.json();
};

const deleteById = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete an anecdote');
    }
};

export default { getAll, createNew, update, deleteById };
