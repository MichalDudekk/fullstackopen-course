import { useState, useEffect } from "react";
import personService from "../services/persons";

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

        const newPerson = {
            name: props.newName,
            number: props.newNumber,
        };

        if (props.persons.find((curr) => curr.name === props.newName)) {
            const ok = window.confirm(
                `${props.newName} already in the phonebook. Do you want to replace their number?`
            );
            if (ok) {
                const id = props.persons.find(
                    (curr) => curr.name === props.newName
                ).id;

                personService
                    .updateById(id, newPerson)
                    .then(() => {
                        console.log(`updated ${props.newName}`);
                        props.setPersons(
                            [...props.persons].map((person) =>
                                person.id !== id ? person : newPerson
                            )
                        );
                        props.setNewName("");
                        props.setNewNumber("");
                    })
                    .catch((err) => console.log(err));
            }

            return;
        }

        personService
            .create(newPerson)
            .then((res) => {
                newPerson.id = res.id;
                props.setPersons([...props.persons].concat(newPerson));
                props.setNewName("");
                props.setNewNumber("");
            })
            .catch((error) => {
                console.log(error);
            });
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

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");

    useEffect(() => {
        personService.getAll().then((data) => setPersons(data));
    }, []);

    const deleteUser = (id) => {
        return () => {
            const ok = window.confirm(`Delete ${id} user?`);
            if (ok) {
                personService
                    .deleteById(id)
                    .then(() => {
                        setPersons(
                            persons.filter((person) => person.id !== id)
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };
    };

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
            <Persons
                newFilter={newFilter}
                persons={persons}
                deleteUser={deleteUser}
            />
        </div>
    );
};

export default App;
