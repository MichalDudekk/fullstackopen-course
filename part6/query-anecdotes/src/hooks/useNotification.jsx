import NotificationContext from '../NotificationContext';
import { useContext } from 'react';

export const useNotification = () => {
    const { notification, setNotification } = useContext(NotificationContext);

    const addNotification = (message, time = 5000) => {
        setNotification(message);
        setTimeout(() => setNotification(null), time);
    };

    return { notification, addNotification };
};
