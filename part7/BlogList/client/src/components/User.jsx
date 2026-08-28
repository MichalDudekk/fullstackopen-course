import { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import userService from '../services/users';

const User = () => {
    const match = useMatch('/users/:id');
    const [user, setUser] = useState(null);

    const id = match ? match.params.id : null;

    useEffect(() => {
        if (id) {
            userService.getById(id).then((fetchedUser) => setUser(fetchedUser));
        }
    }, [id]);

    if (!match) return <>404 - User not found</>;

    if (!user) return null;

    return (
        <>
            <h1>{user.name}</h1>
            {user.blogs.length > 0 && <h2>added blogs</h2>}
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </>
    );
};

export default User;
