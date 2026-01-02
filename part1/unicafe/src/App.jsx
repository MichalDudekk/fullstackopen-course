import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ name, val }) => (
    <tr>
        <td> {name} </td>
        <td>{val}</td>
    </tr>
);

const Statistics = (props) => {
    return (
        <>
            <h1>statistics</h1>
            <table>
                <tbody>
                    {props.tab.map(({ name, val }) => (
                        <StatisticLine name={name} val={val} key={name} />
                    ))}
                </tbody>
            </table>
            {props.tab.length === 0 && <div>No feedback given</div>}
        </>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const all = good + neutral + bad;
    const average = all > 0 ? (good - bad) / all : 0;
    const positive = all > 0 ? good / all : 0;

    const tabStats = [
        {
            name: "good",
            val: good,
        },
        {
            name: "neutral",
            val: neutral,
        },
        {
            name: "bad",
            val: bad,
        },
        {
            name: "all",
            val: all,
        },
        {
            name: "average",
            val: average,
        },
        {
            name: "positive",
            val: positive * 100 + "%",
        },
    ];

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={() => setGood(good + 1)} text="good" />
            <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button onClick={() => setBad(bad + 1)} text="bad" />
            <Statistics tab={all > 0 ? tabStats : []} />
        </div>
    );
};

export default App;
