var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
require("dotenv").config();
// var TYPES = require("tedious").TYPES;

var config = {
  server: String(process.env.SERVER_NAME), //update me
  authentication: {
    type: "default",
    options: {
      userName: String(process.env.USERNAME), //update me
      password: String(process.env.PASSWORD), //update me
    },
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: true,
    database: process.env.DATABASE_NAME, //update me
    // rowCollectionOnDone: true,
  },
};
var connection = new Connection(config);
connection.on("connect", function (err) {
  // If no error, then good to proceed.
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected");
  getAllTodos();
});

// call connection.connect(); before running queries against db
connection.connect();
function getAllTodos() {
  const request = new Request("SELECT * FROM todos", (err, rowCount, rows) => {
    console.log(rows);
  });
}

module.exports = { Request };
