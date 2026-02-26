const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => (
    <div>
        {props.parts.map((part) => (
            <Part part={part} key={part.id} />
        ))}
    </div>
);

const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
);

const Total = (props) => <b>Total of {props.total} exercises</b>;

const Course = ({ course }) => {
    const total = course.parts.reduce((acc, curr) => acc + curr.exercises, 0);

    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={total} />
        </>
    );
};

export default Course;
