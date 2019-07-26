const express = require('express');
const app = require('./config/server');
const mysql = require('./config/db-mysql');

/* Routes modules */
const roles = require('./app/routes/roles')(express, mysql);

/* Routes API */
app.use('/api', roles);


// Start ther server

app.listen(app.get('port'),
    () => {
        console.log('Server on port: ' + app.get('port'));
    });