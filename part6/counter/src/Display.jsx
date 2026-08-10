import { useCounter } from './store';

const Display = () => {
    const counter = useCounter();
    console.log('Display');

    return <div>{counter}</div>;
};

export default Display;
