const cookieName = 'blogsAppLoggedInUser';

export const getUser = () => {
    const user = window.localStorage.getItem(cookieName);

    try {
        const parsedUser = JSON.parse(user);
        return { ok: true, user: parsedUser };
    } catch (error) {
        return { ok: false, error };
    }
};
export const saveUser = (user) => {
    window.localStorage.setItem(cookieName, JSON.stringify(user));
};
export const removeUser = () => {
    window.localStorage.removeItem(cookieName);
};
