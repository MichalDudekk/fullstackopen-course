import { create } from 'zustand';

const useNotificationStore = create((set) => ({
    notification: null,
    actions: {
        setNotification: (notification, time = 5000) => {
            set(() => ({ notification }));
            setTimeout(() => {
                set(() => ({ notification: null }));
            }, time);
        },
    },
}));

export const useNotification = () =>
    useNotificationStore((state) => state.notification);

export const useNotificationActions = () =>
    useNotificationStore((state) => state.actions);
