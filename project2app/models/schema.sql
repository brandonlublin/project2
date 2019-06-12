<<<<<<< HEAD
DROP DATABASE IF EXISTS devquestions_db;
CREATE DATABASE devquestions_db;

use devquestions_db;

=======
DROP DATABASE IF EXISTS questions_db;
CREATE DATABASE questions_db;

-- DROP DATABASE IF EXISTS devquestions_db;
CREATE DATABASE devquestions_db;

use devquestions_db;
-- Create the table in the specified schema
>>>>>>> 3e87cb0983ac7ffbbdc908ff915f478dbcdc17a5
CREATE TABLE questions (
    id int NOT NULL AUTO_INCREMENT,
    question varchar(300) NOT NULL,
    answer varchar(30) NOT NULL,
    PRIMARY KEY (id)
<<<<<<< HEAD
); 
=======
);
>>>>>>> 3e87cb0983ac7ffbbdc908ff915f478dbcdc17a5
