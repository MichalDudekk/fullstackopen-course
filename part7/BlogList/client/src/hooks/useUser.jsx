import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

export const useUser = () => {
    const { user, setUser } = useContext(UserContext);

    const logoutUser = () => {
        setUser(null);
        window.localStorage.removeItem('blogsAppLoggedInUser');
    };

    return { user, setUser, logoutUser };
};
