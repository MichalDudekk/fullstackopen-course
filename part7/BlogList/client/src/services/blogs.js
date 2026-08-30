import axios from 'axios';
const baseUrl = '/api/blogs';

let token;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
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
        config
    );

    delete response.data.user.blogs;
    return response.data;
};

const deleteBlog = async (blog) => {
    const config = {
        headers: { Authorization: token },
    };

    await axios.delete(`${baseUrl}/${blog.id}`, config);

    return blog.id;
};

const postComment = async (comment, blogId) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(
        `${baseUrl}/${blogId}/comments`,
        { comment: comment },
        config
    );

    return response.data;
};

export default { getAll, postBlog, setToken, putBlog, deleteBlog, postComment };
