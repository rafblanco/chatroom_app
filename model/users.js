var orm = require("../config/orm.js");

var user = {
  selectWhere: function (cols, vals, cb) {
    orm.selectWhere("users", cols, vals, function(err, rows){
      cb(err, rows)
    })
  },
  // The variables cols and vals are arrays.
  createUser: function (cols_vals, cb) {
    orm.createUser("users", cols_vals, function(err, rows){
      cb(err, rows)
    })
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = user;