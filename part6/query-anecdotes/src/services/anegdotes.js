const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = async () => {
    const response = await fetch(baseUrl);
    return await response.json();
};
