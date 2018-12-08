var connection = require("./connection.js");

var orm = {
    selectWhere: function (tableInput, colToSearch, valOfCol, cb) {
      var queryString = "SELECT * FROM ?? WHERE ?? = ?";
      connection.query(queryString, [tableInput, colToSearch, valOfCol], function (err, result) {
        if (err) throw err;
        cb(err, result)
      });
    },
    create: function (tableInput, cols_vals, cb) {
      var queryString = "INSERT INTO ?? set ?";
      connection.query(queryString, [tableInput, cols_vals], function (err, result) {
        if (err) throw err;
        cb(err, result)
      });
  
    }
  }

module.exports = orm;