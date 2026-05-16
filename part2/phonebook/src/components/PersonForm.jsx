const PersonForm = (props) => {
    const handleClick = (e) => {
        e.preventDefault();

        const newPerson = {
            name: props.newName,
            number: props.newNumber,
        };

        if (props.persons.find((curr) => curr.name === props.newName)) {
            const ok = window.confirm(
                `${props.newName} already in the phonebook. Do you want to replace their number?`,
            );
            if (ok) {
                const id = props.persons.find(
                    (curr) => curr.name === props.newName,
                ).id;

                props.personService
                    .updateById(id, newPerson)
                    .then(() => {
                        props.setPersons(
                            [...props.persons].map((person) =>
                                person.id !== id ? person : newPerson,
                            ),
                        );
                        props.setNewName("");
                        props.setNewNumber("");
                        props.setNotification({
                            text: `Updated ${newPerson.name}'s numer to ${newPerson.number}`,
                            isError: false,
                        });
                    })
                    .catch((err) => {
                        if (err.status === 404) {
                            props.setNotification({
                                text: `Person with id ${id} has already been deleted`,
                                isError: true,
                            });
                            props.setPersons(
                                props.persons.filter(
                                    (person) => person.id !== id,
                                ),
                            );
                            return;
                        } else {
                            console.log(err);
                            props.setNotification({
                                text: err.response.data.error,
                                isError: true,
                            });
                        }
                    });
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
                props.setNotification({
                    text: `Added new person ${newPerson.name}`,
                    isError: false,
                });
            })
            .catch((error) => {
                props.setNotification({
                    text: error.response.data.error,
                    isError: true,
                });
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
