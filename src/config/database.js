const mongoose = require('mongoose');
const { CONSTANTS } = require('.');
const { logger } = require('../utils');

const dbConnection = () => {
    mongoose.connect(CONSTANTS.DB.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    // eslint-disable-next-line no-console
    db.on('error', (err) => logger.error(`Database connection error - ${err.toString()}`));
    // eslint-disable-next-line no-console
    db.once('open', () => logger.info('Database connected'));
};

module.exports = {
    dbConnection,
};
