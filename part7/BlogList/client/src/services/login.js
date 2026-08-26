import axios from 'axios';
const baseUrl = '/api/login';

const login = async (credentials) => {
    const { username, password } = credentials;

    const response = await axios.post(baseUrl, { username, password });
    return response.data;
};

export default { login };
