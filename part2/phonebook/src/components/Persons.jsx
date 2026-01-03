const Persons = ({ persons, newFilter, deleteUser }) => {
    return (
        <div>
            {persons
                .filter((person) =>
                    person.name
                        .toLocaleLowerCase()
                        .includes(newFilter.toLocaleLowerCase())
                )
                .map((person) => (
                    <div key={person.name}>
                        {" "}
                        {person.name} {person.number}{" "}
                        <button onClick={deleteUser(person.id)}>delete</button>
                    </div>
                ))}
        </div>
    );
};

export default Persons;
