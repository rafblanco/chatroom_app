var connection = require("./connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?")
  }
  return arr.toString();
}

function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    console.log(value)
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      // if (typeof value === "string" && value.indexOf(" ") >= 0) {
      //   value = "'" + value + "'";
      // }
      arr.push(key + "=" + "'" + value + "'");
    }
  }
  console.log(arr)
  // translate array of strings to a single comma-separated string
  return arr.toString();

}
var orm = {
  all: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    })
  },
  createMessage: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    })

  },
  update: function (table, objColVals, condition, cb) {
    console.log(objColVals)
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  delete: function (table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  selectWhere: function (tableInput, colToSearch, valOfCol, cb) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    connection.query(queryString, [tableInput, colToSearch, valOfCol], function (err, result) {
      if (err) throw err;
      cb(err, result)
    });
  },
  createUser: function (tableInput, cols_vals, cb) {
    var queryString = "INSERT INTO ?? set ?";
    connection.query(queryString, [tableInput, cols_vals], function (err, result) {
      if (err) throw err;
      cb(err, result)
    });
  },
  //creates a new table
  createTable: function (newTableName, cb) {
    var queryString = "CREATE TABLE " + newTableName;
    queryString += "( id int NOT NULL AUTO_INCREMENT, message varchar(280) NOT NULL, PRIMARY KEY(id), user varchar(280) NOT NUll);";
    connection.query(queryString, [tableInput, cols_vals], function (err, result) {
      if (err) throw err;
      cb(err, result)
    });
  }
}

module.exports = orm;