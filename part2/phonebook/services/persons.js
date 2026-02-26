import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(baseURL).then((res) => res.data);
};

const create = (newPerson) => {
    return axios.post(baseURL, newPerson).then((res) => res.data);
};

const deleteById = (id) => {
    return axios.delete(`${baseURL}/${id}`);
};

const updateById = (id, newPerson) => {
    return axios.put(`${baseURL}/${id}`, newPerson).then((res) => res.data);
};

export default { getAll, create, deleteById, updateById };
