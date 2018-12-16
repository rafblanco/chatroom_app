DROP DATABASE if exists chatroom_db; 
CREATE DATABASE chatroom_db;

use chatroom_db;

CREATE TABLE users
(
    user_name varchar(30) NOT NULL,
    isLoggedIn BOOLEAN NOT NULL 0,
    PRIMARY KEY(user_name)
);

CREATE TABLE chats
(
    id int NOT NULL AUTO_INCREMENT,
    message varchar(280) NOT NULL,
    PRIMARY KEY(id),
    user varchar(280) NOT NUll,
    foreign key(user) REFERENCES users(user_name)
   );

CREATE TABLE logins
(
    id int NOT NULL AUTO_INCREMENT,
    userlogin varchar(280) NOT NULL,
    dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    foreign key(userlogin) REFERENCES users(user_name)
   );