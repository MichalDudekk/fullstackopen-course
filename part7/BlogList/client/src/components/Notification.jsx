import { Alert } from '@mui/material';
import { useNotificationValue } from '../hooks/useNotification';

const Notification = () => {
    const notification = useNotificationValue();

    if (notification === null) return null;

    return (
        <Alert
            style={{ marginTop: 10, marginBottom: 10 }}
            severity={notification.type}
        >
            {notification.text}
        </Alert>
    );
};

export default Notification;
