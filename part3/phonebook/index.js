const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

morgan.token("body", function (req, res) {
    const body = JSON.stringify(req.body);
    return body || "{}";
});

app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :body",
    ),
);

// const requestLogger = (request, response, next) => {
//     console.log("Method:", request.method);
//     console.log("Path:  ", request.path);
//     console.log("Body:  ", request.body);
//     console.log("---");
//     next();
// };

// app.use(requestLogger);

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.get("/api/persons", (req, res) => {
    res.send(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find((person) => person.id === id);

    if (person) {
        res.send(person);
    } else {
        res.statusMessage = `Person id = ${id} not found`;
        res.status(404).end();
    }
});

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    persons = persons.filter((person) => person.id !== id);

    res.status(204).end();
});

app.post("/api/persons", (req, res) => {
    const name = req.body.name;
    const number = req.body.number;

    if (!name || !number) {
        return res.status(400).json({
            error: "content missing",
        });
    }

    if (persons.find((person) => person.name == name)) {
        return res.status(400).json({
            error: "name must be unique",
        });
    }

    const id = Math.ceil(Math.random() * 1000);
    const person = {
        id: id,
        name: name,
        number: number,
    };

    persons = persons.concat(person);
    res.status(201).send(person);
});

app.get("/info", (request, result) => {
    const length = persons.length;

    result.send(`<p>Phonebook has info for ${length} people</p>
        <p>${Date()}</p>`);
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
