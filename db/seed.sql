INSERT INTO users(user_name) VALUES ('Meili');
INSERT INTO users(user_name) VALUES ('Rafael');
INSERT INTO users(user_name) VALUES ('Alejandro');

INSERT INTO messages(message, user) VALUES("Hello world.", "Meili");
INSERT INTO messages(message, user) VALUES("I like to work on the back end.", "Rafael");
INSERT INTO messages(message, user) VALUES("I like to work on the front end.", "Alejandro");
INSERT INTO messages(message, user) VALUES("I like cats.", "Meili");

SELECT * FROM users;
SELECT * FROM messages; 