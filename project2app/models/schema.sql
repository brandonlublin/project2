
CREATE DATABASE questions_db;

-- DROP DATABASE IF EXISTS devquestions_db;
CREATE DATABASE devquestions_db;

use devquestions_db;
Create the table in the specified schema
CREATE TABLE questions (
    id int NOT NULL AUTO_INCREMENT,
    question varchar(300) NOT NULL,
    answer varchar(30) NOT NULL,
    PRIMARY KEY (id)
);