const connectionConfig = require('../../config/connectionConfig');
const tableName = "TBL_Role";
const mysql2 = require('mysql');

module.exports = (express, mysql, model, modelCollection) => {
    const router = express.Router();

    /* REST Roles */
    router.route('/roles/:id')
        .get( /* Obtener */
            (req, res) => {
                let connection = mysql.createConnection(connectionConfig);
                connection.connect();
                let Role = model(connection, tableName, 'idRol');

                new Role()
                    .fetch(req.params.id)
                    .then(
                        result => {
                            console.log(result);
                            res.json({
                                data: [result],
                                error: 0,
                                message: 'Success'
                            });
                        }
                    )
                    .catch(
                        err => {
                            console.log(err.message);
                            res.json({
                                data: [],
                                error: 1,
                                message: err.message
                            });
                        }
                    );
                connection.end();
            }
        )
        .put( /* Actualizar */
            (req, res) => {
                var connection = mysql.createConnection(connectionConfig);
                connection.connect();
                var Role = model(connection, tableName, 'idRol');

                new Role({
                    name: req.body.name,
                    description: req.body.description
                }).save(req.params.id)
                    .then(
                        result => {
                            console.log(result);
                            res.json({
                                data: [result],
                                error: 0,
                                message: 'Success'
                            });
                        }
                    )
                    .catch(
                        err => {
                            //console.log(err);
                            res.json({
                                data: [],
                                error: 1,
                                message: err.message
                            });
                        }
                    );
                connection.end();
            }
        ).delete( /* Eliminar */
            (req, res) => {
                const connection = mysql2.createConnection({
                    host: 'localhost',
                    user: 'mesacademy',
                    password: 'admin',
                    database: 'mesacademydb'
                    //database: 'new_test'
                });
                connection.connect();
                const Role = model(connection, tableName, 'idRol');

                new Role().destroy(req.params.id)
                    .then(
                        result => {
                            console.log(result);
                            res.send(result);
                        }
                    )
                    .catch(
                        err => {
                            console.log(err);
                            res.json(err);
                        }
                    );
                /*new Role()
                    .fetch({
                        where: "idRol = " + req.params.id
                    })
                    .then(
                        result => {
                            console.log(result);
                            res.json(result);
                        }
                    )
                    .catch(
                        err => {
                            console.log(err.message);
                            res.json(err);
                        }
                    );*/
                connection.end();
            }
        );

    router.route('/roles')
        .get( /* Obtner todo */
            (req, res) => {
                let connection = mysql.createConnection(connectionConfig);
                connection.connect();
                let Role = model(connection, tableName, 'idRol');
                new Role()
                    .fetch()
                    .then(
                        result => {
                            console.log(result);
                            res.json(result);
                        }
                    )
                    .catch(
                        err => {
                            console.log(err.message);
                            res.json(err);
                        }
                    );
                connection.end();
            }
        ).post( /* Insertar */
            (req, res) => {
                let connection = mysql.createConnection(connectionConfig);
                connection.connect();
                let Role = model(connection, tableName, 'idRol');
                new Role()
                    .create({
                        name: req.body.name,
                        description: req.body.description
                    }).then(
                        result => {
                            res.send(result);
                            //console.log(result);
                        }
                    ).catch(
                        err => {
                            result.send(err)
                            //console.log(err);
                        }
                    );
                connection.end();
            }
        );
    return router;
};