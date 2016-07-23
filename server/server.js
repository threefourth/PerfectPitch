var express = require('express');

// MongoDB connection
var db = require('./db/db');

var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 8000));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

// Routing
require('./config/routes')(app, express);

app.listen(app.get('port'), function() {
  console.log('Server listening on port ', app.get('port'));
});
