const sql = require("mssql");
require("dotenv").config();

module.exports = {
  user: String(process.env.USER), // better stored in an app setting such as process.env.DB_USER
  password: String(process.env.PASSWORD), // better stored in an app setting such as process.env.DB_PASSWORD
  server: String(process.env.SERVER_NAME), // better stored in an app setting such as process.env.DB_SERVER
  port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
  database: String(process.env.DATABASE_NAME), // better stored in an app setting such as process.env.DB_NAME
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};
