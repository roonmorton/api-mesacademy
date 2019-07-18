const connectionConfig = require('../../config/connectionConfig');
const tableName = "TBL_Role";

module.exports = (express, mysql, model) => {
    const router = express.Router();

    /* REST Roles */
    router.route('/roles/:id')
        .get( /* Obtener */
            (req, res) => {
                let connection = mysql.createConnection(connectionConfig);
                connection.connect();
                let Role = model(connection, tableName, 'idRol');
                new Role(req.params.id)
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
        )
        .put( /* Actualizar */
            (req, res) => {

            }
        ).delete( /* Eliminar */
            (req, res) => {

            }
        );

    router.route('/roles')
        .get( /* Obtner todo */
            (req, res) => {
                res.send("roles");
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
                        result =>{
                            console.log(result);
                        }
                    ).catch(
                        err =>{
                            console.log(err);
                        }
                    );
                    connection.end();
            }
        );
    return router;
};