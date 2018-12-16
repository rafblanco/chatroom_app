var express = require("express");

var router = express.Router();

var passport = require("../config/passport");
var user = require("../model/users.js")
var chat = require("../model/chat.js");

router.get("/", function (req, res) {
    chat.all(function (data) {
        var messageObj = {
            messages: data
        };

        console.log(messageObj);
        res.render("index", messageObj);
    });

    // user.all(function (data) {
    //     var users = {
    //         user: data
    //     };

    //     console.log(users);
    //     res.render("index",users); 
    // });

    // res.render("index",users)
});

router.get("/allmessages", function (req, res) {
    chat.all(function (data) {
        var messageObj = {
            messages: data
        };

        console.log(messageObj);
        res.render("index", messageObj);
    });


    // user.all(function (data) {
    //     var users = {
    //         user: data
    //     };

    //     console.log(users);
    //     // res.render("index",users); 
    // });

    // res.render("index",messageObj)
});
router.get("/allusers", function (req, res) {
    user.all(function (data) {
        var allUsers = {
            users: data
        };
        console.log(allUsers);
        res.json(allUsers);
    });
});
router.post("/api/chat", function (req, res) {
    console.log("Hit chatt successfully")
    chat.createMessage([
        "user", "message"
    ],
        [
            req.body.user, req.body.message
        ],
        function (result) {
            res.json({ id: result.insertId });

        });
});

router.put("/api/chat/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    chat.update({
        message: req.body.message
    },
        condition, function (result) {
            if (result.changedRows == 0) {
                return res.status(404).end();
            }
            else {
                res.status(200).end();
            }
        });
});

router.delete("/api/chat/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    chat.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

module.exports = router;

// module.exports = function (app) {

//   function auth(req, res, next, authMethod) {
//     passport.authenticate(authMethod, function (err, user, info) {
//       if (err) {
//         res.status(500)
//         res.json(err)
//       }
//       if (!user) {
//         res.status(401)
//         res.json(info.message)
//       }
//       else {
//         req.logIn(user, function (err) {
//           if (err) { return next(err); }
//           res.status(200)
//           res.json("/members");
//         });
//       }
//     })(req, res)
//   }

//   // Using the passport.authenticate middleware with our local strategy.
//   // If the user has valid login credentials, send them to the members page.
//   // Otherwise the user will be sent an error
//   router.post("/api/login", function (req, res, next) {
//     auth(req, res, next, "local-login")
//   });

//   // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
//   // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
//   // otherwise send back an error
//   router.post("/api/signup", function (req, res, next) {
//     auth(req, res, next, "local-signup")
//   });

//   // Route for logging user out
//   router.get("/logout", function (req, res) {
//     req.logout();
//     res.redirect("/");
//   });

//   // Route for getting some data about our user to be used client side
//   router.get("/api/user_data", function (req, res) {
//     if (!req.user) {
//       // The user is not logged in, send to home page
//       res.redirect("/");
//     }
//     else {
//       // Otherwise send back the user's email and id
//       // Sending back a password, even a hashed password, isn't a good idea
//       res.json({
//         email: req.user.email,
//         id: req.user.id
//       });
//     }
//   });

// };

