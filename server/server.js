var express = require('express');
var db = require('./db/db');

var morgan = require('morgan');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8000;

var app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
// app.use(express.static(__dirname + '/'));

app.get('/', function(request, response) {
  response.send('App is running');
});

// Database connection
db.connection.connect(error => {
  if (!error) {
    console.log('Successfully connected to the database!');
    return;
  } 

  console.log('Encountered an error connecting to the database...');
});

app.listen(app.get('port'), function() {
  console.log('Server listening on port ', app.get('port'));
});
