import axios from 'axios';
const baseUrl = '/api/blogs';

let token;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const postBlog = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);

    // Kontrowersyjne. Po stworzeniu nowego bloga, jego pole user zawiera pełne pole blogs.
    // np. response.data = {author: ..., id: ..., user: {id: ..., username: ..., name: ..., blogs: [ TUTAJ PEŁNA TABLICA ID ]}}
    delete response.data.user.blogs;
    return response.data;
};

const putBlog = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.put(
        `${baseUrl}/${newObject.id}`,
        newObject,
        config,
    );

    delete response.data.user.blogs;
    return response.data;
};

export default { getAll, postBlog, setToken, putBlog };
