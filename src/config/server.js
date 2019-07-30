const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const env = require('dotenv').config();


/* Configuration */

app.set('port',process.env.PORT || 3000);

/* Middlewares */

app.use(bodyParser.json());


module.exports = app;