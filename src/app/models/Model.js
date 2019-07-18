const mysqlNackBone = require('mysql-backbone');

module.exports = 
(con, tableName,idAttribute ='id') =>{
    return mysqlNackBone.Model.extend(
        {
            connection: con,
            tableName: tableName,
            idAttribute: idAttribute
        }
    );
};