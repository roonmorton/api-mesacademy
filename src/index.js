const express = require('express');
const app = require('./config/server');
const mysql = require('mysql');
const model = require('./app/models/Model')
const modelCollection = require('./app/models/ModelCollection');

/* Routes modules */
const roles = require('./app/routes/roles')(express, mysql, model,modelCollection);

//require('./app/routes/users')(app);

/* Routes */
app.use('/api', roles);


// Start ther server

app.listen(app.get('port'),
    () => {
        console.log('Server on port: ' + app.get('port'));
    });