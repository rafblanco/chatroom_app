var orm = require("../config/orm.js");

var user = {
  all: function (cb) {
    orm.all("users", function (res) {
      cb(res);
    });
  },
  selectWhere: function (cols, vals, cb) {
    orm.selectWhere("users", cols, vals, function (err, rows) {
      cb(err, rows)
    })
  },
  // The variables cols and vals are arrays.
  createUser: function (cols_vals, cb) {
    orm.createUser("users", cols_vals, function (err, rows) {
      cb(err, rows)
    })
  },
  update: function(objColVals, condition, cb){
    orm.update("users", objColVals, condition, function(res){
        cb(res); 
    }); 
},
};

// Export the database functions for the controller (catsController.js).
module.exports = user;