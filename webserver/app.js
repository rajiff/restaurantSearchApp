const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');

const mongoConn = require('./mongoConnection')();

let app = express();

// Configure morgan to log your requests, with a standard date & time format
morgan.token('time', (req, res) => new Date().toISOString());
app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));

app.use(compression());

// Setup bodyParsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Avoid frequent (spam) favicon request by sending no content status
app.use('/favicon.ico', function(req, res, next) {
    res.status(204);
    next();
});

module.exports = app;
