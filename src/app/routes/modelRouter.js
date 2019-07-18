const connectionConfig = require('../../config/connectionConfig');
const tableName = "TBL_Role";

module.exports = (express, mysql) => {
    const router = express.Router();

    /* REST Roles */
    router.route('/roles/:id')
        .get( /* Obtener */
            (req, res) => {
                res.end('Hola Roles');
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
            (req,res)=>{

            }
        ).post( /* Insertar */
            (req,res)=>{

            }
        );
    return router;
};