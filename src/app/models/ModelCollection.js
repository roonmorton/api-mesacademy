const mysqlNackBone = require('mysql-backbone');

module.exports = 
(con, tableName,idAttribute ='id') =>{
    return mysqlNackBone.Collection.extend(
        {
            connection: con,
            tableName: tableName,
            idAttribute: idAttribute
        }
    );
};