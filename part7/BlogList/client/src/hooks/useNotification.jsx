import { useContext } from 'react';
import NotificationContext from '../contexts/NotificationContext';

export const useNotificationValue = () => {
    const [notification] = useContext(NotificationContext);
    return notification;
};

export const useAddNotification = () => {
    const [, setNotification] = useContext(NotificationContext);

    const addNotification = (content, type, time = 5000) => {
        setNotification({ query: 'SET', payload: content, type: type });
        setTimeout(() => {
            setNotification({ query: 'CLEAR' });
        }, time);
    };

    return addNotification;
};
