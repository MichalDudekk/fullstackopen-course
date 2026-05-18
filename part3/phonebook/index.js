// index.js
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
// const cors = require("cors");
const Person = require('./models/person.js');
const PORT = process.env.PORT || 3001;

const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

morgan.token('body', function (req, _res) {
    const body = JSON.stringify(req.body);
    return body || '{}';
});

app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body',
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

app.get('/api/persons', (req, res) => {
    Person.find({}).then((notes) => {
        res.json(notes);
    });
});

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findById(id)
        .then((person) => {
            if (person) {
                res.send(person);
            } else {
                res.statusMessage = `Person id = ${id} not found`;
                res.status(404).end();
            }
        })
        .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findByIdAndDelete(id)
        .then((_result) => {
            res.status(204).end();
        })
        .catch((error) => {
            next(error);
        });
});

app.post('/api/persons', (req, res, next) => {
    const name = req.body.name;
    const number = req.body.number;

    const person = new Person({
        name: name,
        number: number,
    });

    person
        .save()
        .then((savedPerson) => {
            res.json(savedPerson);
        })
        .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    const { name, number } = req.body;

    Person.findById(id)
        .then((person) => {
            if (!person) {
                return res.status(404).end();
            }

            person.name = name;
            person.number = number;

            return person.save().then((updatedNote) => {
                res.json(updatedNote);
            });
        })
        .catch((error) => next(error));
});

app.get('/info', (request, result) => {
    Person.find({}).then((persons) => {
        const length = persons.length;

        result.send(`<p>Phonebook has info for ${length} people</p>
        <p>${Date()}</p>`);
    });
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
