/*const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg')
        cb(null, true);
    else
        cb(null, false);
};

const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 1
    },
    fileFilter: fileFilter
}).single('image');

*/


/*
    /
        GET - Select
        POST - Save
    /:id 
        GET - Find one
        PUT - Updata
        DELETE - Delete
    /username/:username
        GET - Count User 

*/
var tableModel = {
    tableName: 'TBL_User',
    idAttribute: 'idUser'
};
module.exports = (express, mysql, response) => {
    const router = express.Router();

    /* REST Roles */
    router.route('/users/:id')
        .get( /* Obtener */
            (req, res) => {
                mysql.find({
                    tableModel: tableModel,
                    params: {
                        id: req.params.id,
                        fields: ['*']
                    }
                })
                    .then(
                        result => {
                            response.send(res, result, 'Successfully', 'Complete transaction');
                        })
                    .catch(err => {
                        response.send(res, result, '', 'Error', err);
                    });
            })
        .put( /* Actualizar */
            (req, res) => {
                mysql.save({
                    obj: {
                        id: req.params.id,
                        name: req.body.name,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        username: req.body.username,
                        birthday: req.body.birthday,
                        sex: req.body.sex,
                        phone: req.body.phone,
                        create_user: req.body.user || ''
                    },
                    tableModel: tableModel
                })
                    .then(
                        result => {
                            response.send(res, result, 'Successfully', 'Complete transaction');
                        })
                    .catch(
                        err => {
                            response.send(res, result, '', 'Error', err);
                        });
            }).delete( /* Eliminar */
                (req, res) => {
                    mysql.save({
                        obj: {
                            id: req.params.id,
                            status: '0'
                        },
                        tableModel: tableModel
                    })
                        .then(
                            result => {
                                response.send(res, result, 'Successfully', 'Complete transaction');
                            })
                        .catch(
                            err => {
                                response.send(res, result, '', 'Error', err);
                            });
                });

    router.route('/users/username/:username')
        .get(/* Obtener username */
            (req, res) => {
                mysql.count({
                    tableModel: tableModel,
                    conditions: {
                        where: "username='" + req.params.username + "' AND status = '1'"
                    }
                })
                    .then(
                        result => {
                            response.send(res, result, 'Successfully', 'Complete transaction');
                        })
                    .catch(
                        err => {
                            //console.log(err);
                            response.send(res, result, '', 'Error', err);
                        });
            });
    router.route('/users')
        .get( /* Obtner todo */
            (req, res) => {
                mysql.fetch({
                    tableModel: tableModel,
                    conditions: {
                        fields: ["*"],
                        limit: [1, 50]
                    }
                })
                    .then(
                        result => {
                            response.send(res, result, 'Successfully', 'Complete transaction');
                        })
                    .catch(
                        err => {
                            response.send(res, result, '', 'Error', err);
                        });
            })
            .post( /* Insertar */
            (req, res) => {
                //console.log("user");
                mysql.count({
                    tableModel: tableModel,
                    conditions: {
                        where: "email='" + req.body.email + "' OR username = '" + req.body.username + "'"
                    }
                })
                    .then(
                        result => {
                            if (result.counter > 0) {
                                response.send(res, result, '', 'Error', { message: 'Usuario ya Existe' });
                            } else {
                                mysql.save({
                                    obj: {
                                        name: req.body.name,
                                        lastname: req.body.lastname,
                                        email: req.body.email,
                                        username: req.body.username,
                                        birthday: req.body.birthday,
                                        sex: req.body.sex,
                                        phone: req.body.phone,
                                        create_user: req.body.user || ''
                                    },
                                    tableModel: tableModel
                                })
                                    .then(
                                        result => {
                                            response.send(res, result, 'Successfully', 'User add');
                                        })
                                    .catch(
                                        err => {
                                            response.send(res, result, '', 'Error', err);
                                        });
                            }
                        })
                    .catch(
                        err => {
                            response.send(res, result, '', 'Error', err);

                        });
            });
    return router;
};