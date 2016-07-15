var mysql = require('mysql');

// Create database connection
var connection = mysql.createConnection({
  user: 'root',
  password: '3/4',
  database: 'threefourths'
});

exports.connection = connection;