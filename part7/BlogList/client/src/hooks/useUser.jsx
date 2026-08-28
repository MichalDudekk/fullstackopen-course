import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import loginService from '../services/login';
import blogService from '../services/blogs';

export const useUser = () => {
    const { user, setUser } = useContext(UserContext);

    const logoutUser = () => {
        setUser(null);
        window.localStorage.removeItem('blogsAppLoggedInUser');
    };

    const loginUser = async (username, password) => {
        try {
            const newUser = await loginService.login({ username, password });
            setUser(newUser);
            window.localStorage.setItem(
                'blogsAppLoggedInUser',
                JSON.stringify(newUser)
            );

            blogService.setToken(newUser.token);

            return { ok: true, user: newUser };
        } catch (e) {
            return { ok: false, error: e };
        }
    };

    return { user, setUser, logoutUser, loginUser };
};
