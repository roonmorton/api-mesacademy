/*
    /images
        GET - get all
        POST - save any image
    
    /images/:id
        PUT - update image
        DELETE - delete image
        GET - get image
    

*/
var fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, String(Date.now()) + '-' + Math.floor(Math.random() * 100) + '.' + (file.mimetype).split('/')[1])
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg')
        cb(null, true);
    else
        cb(null, false);

};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1
    },
    fileFilter: fileFilter
}).single('image');


var tableModel = {
    tableName: 'TBL_Image',
    idAttribute: 'idImage'
};

module.exports = (express, mysql, response) => {
    const router = express.Router();

    /* REST Images */


    router.route('/images/:id')
        .get(
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
        .put(
            (req, res) => {
                upload(req, res, function (err) {
                    if (req.file) {
                        if (err instanceof multer.MulterError) {
                            // A Multer error occurred when uploading.
                            fs.unlink(req.file.path);
                            response.send(res, null, '', 'Error', err);
                        } else if (err) {
                            // An unknown error occurred when uploading.
                            fs.unlink(req.file.path);
                            response.send(res, null, '', 'Error', err);
                        }
                        else {
                            mysql.find({
                                tableModel: tableModel,
                                params: {
                                    id: req.params.id,
                                    fields: ['*']
                                }
                            })
                                .then(
                                    result => {
                                        if (result.idImage) {
                                            fs.exists(result.path, function (exists) {
                                                if (exists) {
                                                    var path = result.path;
                                                }
                                                mysql.save({
                                                    obj: {
                                                        id: req.params.id,
                                                        path: req.file.path,
                                                        name: req.file.filename,
                                                        type: req.file.mimetype
                                                    },
                                                    tableModel: tableModel
                                                })
                                                    .then(
                                                        result => {
                                                            if (path)
                                                                fs.unlink(path,
                                                                    error => {
                                                                        if (error)
                                                                            response.send(res, null, '', 'Error', error);
                                                                        //else
                                                                        //response.send(res, result, 'Successfully', 'Complete transaction');
                                                                    });
                                                            response.send(res, result, 'Successfully', 'Complete transaction');

                                                        })
                                                    .catch(
                                                        err => {
                                                            fs.unlink(req.file.path,
                                                                error => {
                                                                    if (error)
                                                                        response.send(res, null, '', 'Error', error);
                                                                    else
                                                                        response.send(res, result, '', 'Error', err);
                                                                });
                                                        });
                                            });
                                        } else {
                                            fs.unlink(req.file.path,
                                                error => {
                                                    if (error)
                                                        response.send(res, null, '', 'Error', error);
                                                    else
                                                        response.send(res, result, '', 'Error', { message: 'File not found, so not deleting' });
                                                });
                                        }
                                    })
                                .catch(err => {
                                    fs.unlink(req.file.path,
                                        error => {
                                            if (error)
                                                response.send(res, null, '', 'Error', error);
                                            else
                                                response.send(res, null, '', 'Error', err);
                                        });
                                });
                        }
                    } else
                        response.send(res, null, '', 'Error', { message: 'File not supported' });
                });
            })
        .delete(
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
                            if (result.idImage) {
                                var path = result.path;
                                mysql.delete({
                                    id: req.params.id,
                                    tableModel: tableModel
                                }).then(
                                    result => {
                                        fs.unlink(path,
                                            error => {
                                                if (error)
                                                    response.send(res, null, '', 'Error', error);
                                                else
                                                    response.send(res, [], result.info, 'Complete transaction');

                                                //response.send(res, result, 'Successfully', 'Complete transaction');
                                            });

                                    })
                                    .catch(
                                        err => {
                                            response.send(res, null, '', 'Error', err);
                                        });
                            } else
                                response.send(res, null, '', 'Error', { message: 'Image not found' });


                        })
                    .catch(
                        err => {
                            response.send(res, null, '', 'Error', err);
                        });


            });
    router.route('/images')
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
        .post( /* Insertar */(req, res) => {
            upload(req, res, function (err) {
                if (req.file) {
                    if (err instanceof multer.MulterError) {
                        // A Multer error occurred when uploading.
                        response.send(res, result, '', 'Error', err);
                    } else if (err) {
                        // An unknown error occurred when uploading.
                        response.send(res, result, '', 'Error', err);
                    }
                    else {
                        //console.log(req.file);
                        mysql.save({
                            obj: {
                                path: req.file.path,
                                name: req.file.filename,
                                type: req.file.mimetype
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
                    }
                } else
                    response.send(res, null, '', 'Error', { message: 'File not supported' });
            });
        });
    return router;
};