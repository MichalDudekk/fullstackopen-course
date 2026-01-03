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

                props.personService
                    .updateById(id, newPerson)
                    .then(() => {
                        props.setPersons(
                            [...props.persons].map((person) =>
                                person.id !== id ? person : newPerson
                            )
                        );
                        props.setNewName("");
                        props.setNewNumber("");
                        props.setNotification(
                            `Updated ${newPerson.name}'s numer to ${newPerson.number}`
                        );
                    })
                    .catch((err) => console.log(err));
            }

            return;
        }

        props.personService
            .create(newPerson)
            .then((res) => {
                newPerson.id = res.id;
                props.setPersons([...props.persons].concat(newPerson));
                props.setNewName("");
                props.setNewNumber("");
                props.setNotification(`Added new person ${newPerson.name}`);
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

export default PersonForm;
