import { createContext, useState } from 'react';
import blogService from '../services/blogs';

const UserContext = createContext();

export default UserContext;

export const UserContextProvider = (props) => {
    const [user, setUser] = useState(() => {
        const savedUser = window.localStorage.getItem('blogsAppLoggedInUser');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                blogService.setToken(parsedUser.token);
                return parsedUser;
            } catch (err) {
                console.error('Failed to parse user from localStorage', err);
                return null;
            }
        }
        return null;
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
};
