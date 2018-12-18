var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var bcrypt = require('bcrypt-nodejs');
var model = require("../model/users");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username and password
passport.use(
  'local-login',
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    function (req, username, password, done) { // callback with username and password from our form
      model.selectWhere("username", username, function (err, rows) {
        if (err)
          return done(err);
        if (!rows.length) {
          return done(null, false, { message: 'No user found.' });
        }

        // if the user is found but the password is wrong
        if (!bcrypt.compareSync(password, rows[0].password))
          return done(null, false, { message: 'Oops! Wrong password.' });

        // all is well, return successful user
        return done(null, rows[0]);
      });
    })
);

passport.use(
  'local-signup',
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    function (req, username, password, done) {
      // find a user whose username is the same as the forms username
      // we are checking to see if the user trying to login already exists
      model.selectWhere("username", username, function (err, rows) {
        if (err)
          return done(err);
        if (rows.length) {
          return done(null, false, { message: 'That username is already taken.' });
        } else {
          // if there is no user with that username
          // create the user
          var newUser = {
            username: username,
            password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
          };

          model.createUser({ 'username': newUser.username, 'password': newUser.password }, function (err, rows) {
            newUser.id = rows.insertId;

            return done(null, newUser);
          });
        }
      });
    })
);

// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
  model.selectWhere("id", id, function (err, rows) {
    done(err, rows[0]);
  });
});

// Exporting our configured passport
module.exports = passport;
