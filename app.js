require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
var path = require('path');
var fs = require('fs');
const { logger } = require('./src/utils');
const { errorHandler } = require('./src/helpers');
const routes = require('./src/routes');

const app = express();

app.use(
    express.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 1000000,
    })
);
app.use(express.json({ limit: '50mb' }));

// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
  }))
   
// log all requests to access.log
app.use(morgan('common', {
stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))


app.use('/api/v1', routes);

app.use(errorHandler);

process.on('uncaughtException', function (err) {
    logger.error(err);
});

// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', function (reason, p) {
    logger.error(reason);
});

module.exports = app;
  