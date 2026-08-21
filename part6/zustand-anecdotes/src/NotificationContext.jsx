import { createContext, useState } from 'react';

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useState(null);

    const addNotification = (message, time = 5000) => {
        setNotification(message);
        setTimeout(() => setNotification(null), time);
    };

    return (
        <NotificationContext.Provider value={{ notification, addNotification }}>
            {props.children}
        </NotificationContext.Provider>
    );
};
