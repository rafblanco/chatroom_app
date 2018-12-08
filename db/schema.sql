DROP DATABASE if exists chatroom_db; 
CREATE DATABASE chatroom_db;

use chatroom_db;

CREATE TABLE users
(
    user_name varchar(30) NOT NULL,
    PRIMARY KEY(user_name)
);

CREATE TABLE messages
(
    id int NOT NULL AUTO_INCREMENT,
    message varchar(280) NOT NULL,
    PRIMARY KEY(id),
    user varchar(280) NOT NUll,
    foreign key(user) REFERENCES users(user_name)
   );
