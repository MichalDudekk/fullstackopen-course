const mongoose = require('mongoose');

const argc = process.argv.length;

if (argc < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];
const collectionName = 'phonebook';

const url = `mongodb+srv://fullstack:${password}@cluster0.tpayaeq.mongodb.net/${collectionName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (argc === 3) {
    // get all persons
    Person.find({}).then((result) => {
        result.forEach((person) => console.log(person));

        mongoose.connection.close();
    });
} else if (argc === 5) {
    // add new person
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
        name: name,
        number: number,
    });

    person.save().then((_result) => {
        // console.log(result);
        console.log('A new person has been added');
        mongoose.connection.close();
    });
} else {
    console.log(`Invalid number of arguments (${argc})`);
    process.exit(1);
}
