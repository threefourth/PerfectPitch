var mysql = require('mysql');

// Create database connection
var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'threefourths'
});

exports.connection = connection;