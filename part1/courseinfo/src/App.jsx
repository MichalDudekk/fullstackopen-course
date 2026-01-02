const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
    <p>
        {props.part} {props.exercises}
    </p>
);

const Content = (props) => {
    let key = 0;
    return props.tab.map((current) => (
        <Part key={key++} part={current.name} exercises={current.exercises} />
    ));
};

const Total = (props) => {
    const sum = props.tab.reduce(
        (accumulator, current) => accumulator + current,
        0
    );
    return <p>Number of excercises {sum}</p>;
};

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
            },
            {
                name: "State of a component",
                exercises: 14,
            },
        ],
    };

    return (
        <div>
            <Header course={course.name} />
            <Content tab={course.parts} />
            <Total tab={course.parts.map((part) => part.exercises)} />
        </div>
    );
};

export default App;
