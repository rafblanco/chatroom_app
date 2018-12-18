DROP DATABASE if exists chatroom_db; 
CREATE DATABASE chatroom_db;

use chatroom_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE chats
(
    id int NOT NULL AUTO_INCREMENT,
    message varchar(280) NOT NULL,
    PRIMARY KEY(id),
    user varchar(280) NOT NUll,
    foreign key(user) REFERENCES users(user_name)
);
