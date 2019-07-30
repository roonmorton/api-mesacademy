const express = require('express');
const app = require('./config/server');
const mysql = require('./config/db-mysql');
const response = require('./config/my-response');

/* Routes modules */
const roles = require('./app/routes/roles')(express, mysql);
const images = require('./app/routes/images')(express,mysql,response);
const users = require('./app/routes/users')(express,mysql,response);


/* Routes API */
app.use('/api', roles);
app.use('/api', images);
app.use('/api', users);

// Start ther server

app.listen(app.get('port'),
    () => {
        console.log('Server on port: ' + app.get('port'));
    });