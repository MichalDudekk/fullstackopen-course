import { useState } from 'react';
import Navbar from './components/Navbar';
import Panel from './components/Panel';
import CounterContext from './components/CounterContext';

const App = () => {
    const [counter, setCounter] = useState(0);

    return (
        <CounterContext.Provider value={{ counter, setCounter }}>
            <div>
                <Navbar />
                <Panel />
                {/* <Footer /> */}
            </div>
        </CounterContext.Provider>
    );
};

export default App;
