var express = require('express');
var mongoose = require('mongoose');
var schemas = require('./db/schemas');

var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 8000));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

// Database connection
mongoose.connect('mongodb://localhost/threefourths');

// Connect to local server
app.listen(app.get('port'), function() {
  console.log('Server listening on port ', app.get('port'));
});
