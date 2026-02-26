import { useState, useEffect } from "react";
import personService from "../services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [notification, setNotification] = useState({
        text: null,
        isError: false,
    });

    useEffect(() => {
        personService.getAll().then((data) => setPersons(data));
    }, []);

    useEffect(() => {
        if (notification.text === null) return;
        setTimeout(
            () =>
                setNotification({
                    text: null,
                    isError: false,
                }),
            4000,
        );
    }, [notification]);

    const deleteUser = (id) => {
        return () => {
            const ok = window.confirm(`Delete ${id} user?`);
            if (ok) {
                personService
                    .deleteById(id)
                    .then(() => {
                        setNotification({
                            text: `Deleted person by id ${id}`,
                            isError: false,
                        });
                        setPersons(
                            persons.filter((person) => person.id !== id),
                        );
                    })
                    .catch((err) => {
                        if (err.status === 404) {
                            setNotification({
                                text: `Person with id ${id} has already been deleted`,
                                isError: true,
                            });
                            setPersons(
                                persons.filter((person) => person.id !== id),
                            );
                            return;
                        }
                        console.log(err);
                    });
            }
        };
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification
                message={notification.text}
                isError={notification.isError}
            />
            <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
            <h2>add a new</h2>
            <PersonForm
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
                persons={persons}
                setPersons={setPersons}
                personService={personService}
                setNotification={setNotification}
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
