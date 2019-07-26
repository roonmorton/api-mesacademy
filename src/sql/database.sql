
CREATE DATABASE mesacademydb;

CREATE USER 'mesacademy'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON mesacademydb.* TO 'mesacademy'@'localhost';
FLUSH PRIVILEGES;

USE mesacademydb;



CREATE TABLE TBL_Role(
    idRol INT NOT NULL AUTO_INCREMENT,
    description VARCHAR(125),
    name VARCHAR(125),
    creation_date     DATETIME DEFAULT CURRENT_TIMESTAMP,
    modification_date DATETIME ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(idRol)
);