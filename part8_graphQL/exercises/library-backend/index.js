require('dotenv').config();

const startServer = require('./server');
const connectToDatabase = require('./db.js');

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI;

const main = async () => {
    await connectToDatabase(URI);
    startServer(PORT);
};

main();
