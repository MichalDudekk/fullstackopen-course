// logger.js
const { NODE_ENV } = require('./config.js');

const info = (...params) => {
    if (NODE_ENV !== 'test') {
        console.log(...params);
    }
};

const error = (...params) => {
    if (NODE_ENV !== 'test') {
        console.error(...params);
    }
};

module.exports = {
    info,
    error,
};
