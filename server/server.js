var express = require('express');

var morgan = require('morgan');
var bodyParser = require('body-parser');

var port = 8000;

var app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.listen(port, function() {
  console.log('Server listening on port ', port);
});