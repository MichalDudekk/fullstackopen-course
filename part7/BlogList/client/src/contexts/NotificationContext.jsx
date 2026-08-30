import { createContext, useReducer } from 'react';

const NotificationContext = createContext();

export default NotificationContext;

const notificationReducer = (state, action) => {
    switch (action.query) {
        case 'SET':
            return { text: action.payload, type: action.type };
        case 'CLEAR':
            return null;
        default:
            return state;
    }
};

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        null
    );

    return (
        <NotificationContext.Provider
            value={[notification, notificationDispatch]}
        >
            {props.children}
        </NotificationContext.Provider>
    );
};
