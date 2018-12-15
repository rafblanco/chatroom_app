INSERT INTO users(user_name) VALUES ('Meili');
INSERT INTO users(user_name) VALUES ('Rafael');
INSERT INTO users(user_name) VALUES ('Alejandro');

INSERT INTO chats(message, user) VALUES("Hello world.", "Meili");
INSERT INTO chats(message, user) VALUES("I like to work on the back end.", "Rafael");
INSERT INTO chats(message, user) VALUES("I like to work on the front end.", "Alejandro");
INSERT INTO chats(message, user) VALUES("I like cats.", "Meili");

INSERT INTO logins(userlogin) VALUES("Alejandro");



SELECT * FROM users;
SELECT * FROM messages;
SELECT * FROM logins;