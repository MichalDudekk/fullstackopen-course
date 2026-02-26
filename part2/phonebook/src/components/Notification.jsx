const Notification = ({ message, isError }) => {
    if (message === null) {
        return null;
    }

    return (
        <div className={`notification ${isError ? "error" : null}`}>
            {message}
        </div>
    );
};

export default Notification;
