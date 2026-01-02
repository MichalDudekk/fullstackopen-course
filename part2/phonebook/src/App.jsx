import { useState } from "react";

const Filter = ({ newFilter, setNewFilter }) => {
    return (
        <div>
            filter shown with{" "}
            <input
                value={newFilter}
                onChange={(e) => setNewFilter(e.target.value)}
            />
        </div>
    );
};

const PersonForm = (props) => {
    const handleClick = (e) => {
        e.preventDefault();

        if (props.persons.find((curr) => curr.name === props.newName)) {
            alert(`${props.newName} is already added to phonebook`);
            return;
        }

        props.setPersons(
            [...props.persons].concat({
                name: props.newName,
                number: props.newNumber,
            })
        );
        props.setNewName("");
        props.setNewNumber("");
    };

    return (
        <form>
            <div>
                name:{" "}
                <input
                    value={props.newName}
                    onChange={(e) => props.setNewName(e.target.value)}
                />
            </div>
            <div>
                number:{" "}
                <input
                    value={props.newNumber}
                    onChange={(e) => props.setNewNumber(e.target.value)}
                />
            </div>
            <div>
                <button type="submit" onClick={handleClick}>
                    add
                </button>
            </div>
        </form>
    );
};

const Persons = ({ persons, newFilter }) => {
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
                        {person.name} {person.number}
                    </div>
                ))}
        </div>
    );
};

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
            <h2>add a new</h2>
            <PersonForm
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
                persons={persons}
                setPersons={setPersons}
            />
            <h2>Numbers</h2>
            <Persons newFilter={newFilter} persons={persons} />
        </div>
    );
};

export default App;
