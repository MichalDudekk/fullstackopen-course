import { createContext, useState } from 'react';
import blogService from '../services/blogs';
import { getUser } from '../services/persistentUser';

const UserContext = createContext();

export default UserContext;

export const UserContextProvider = (props) => {
    const [user, setUser] = useState(() => {
        const response = getUser();
        if (!response.ok) {
            console.error(
                'Failed to parse user from localStorage',
                response.error
            );
            return null;
        }

        if (!response.user) return null;

        const parsedUser = response.user;
        blogService.setToken(parsedUser.token);
        return parsedUser;
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
};
