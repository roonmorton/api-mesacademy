module.exports = (express, mysql) => {
    const router = express.Router();

    /* REST Roles */
    router.route('/roles/:id')
        .get( /* Obtener */
            (req, res) => {
                //var data = 
                mysql.find(
                    {
                        params: {
                            id: req.params.id,
                            fields: '*'
                        },
                        tableName: 'TBL_Role',
                        idAttribute: 'idRol'
                    } 
                )
                    .then(
                        (result) => {
                            console.log(result);
                            res.send(result);
                        })
                    .catch(
                        err => {
                            console.log(err);
                            res.send(err);
                        });
            }
        )
        .put( /* Actualizar */
            (req, res) => {
                mysql.save({
                    obj: {
                        id: req.params.id,
                        description: req.body.description,
                        name: req.body.name
                    },
                    tableName: 'TBL_Role',
                    idAttribute: 'idRol'
                })
                    .then(
                        (result) => {
                            //console.log(fields);
                            res.send(result);
                        })
                    .catch(
                        (err) => {
                            //console.log(err);
                            console.log(err);
                            res.json(err);
                        });
            }
        ).delete( /* Eliminar */
            (req, res) => {

                mysql.delete({
                    id: req.params.id,
                    tableName: 'TBL_Role',
                    idAttribute: 'idRol'
                }).then(
                    result => {
                        console.log(result);

                        res.send(result);
                    })
                    .catch(
                        err => {
                            console.log(err);
                            res.send(err.error);
                        });
            }
        );

    router.route('/roles')
        .get( /* Obtner todo */
            (req, res) => {

                mysql.query(
                    "select * from TBL_Role"
                )
                .then(
                    result =>{
                        console.log(result);
                        //res.send(result);
                        res.send(result);
                    }
                )
                .catch(
                    err => {
                        console.log(err);
                        //res.send(err);
                    }
                );
               /* mysql.fetch(
                    {
                        tableName: 'TBL_Role',
                        conditions: {
                            fields: ["idRol", "description"],
                            order: 'idRol',
                            orderDESC: false
                        }
                    })
                    .then(
                        result => {
                            console.log(result);
                            res.send(result);
                        }
                    )
                    .catch(
                        err => {
                            console.log(err);
                            res.send(err);
                        }
                    );*/
            }
        ).post( /* Insertar */
            (req, res) => {

                mysql.save({
                    obj: {
                        description: req.body.description,
                        name: req.body.name
                    },
                    tableName: 'TBL_Role',
                    idAttribute: 'idRol'
                })
                    .then(
                        (result) => {
                            //console.log(fields);
                            res.send(result);
                        })
                    .catch(
                        (err) => {
                            //console.log(err);
                            res.json(err);
                        });

            }
        );
    return router;
};