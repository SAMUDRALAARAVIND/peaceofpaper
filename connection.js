const mysql = require("mysql");
var dbCredentials = {
    host:"localhost",
    user:"root",
    password:"Indian@123",
    database:"users"
}
var connection = mysql.createConnection(dbCredentials);

module.exports = connection;