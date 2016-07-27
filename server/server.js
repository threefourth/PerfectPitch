var express = require('express');
var io = require('socket.io')(app);
// MongoDB connection
var db = require('./db/db');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.set('port', (process.env.PORT || 8000));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
app.use(session({
  secret: 'good eats is a secret',
  resave: false,
  saveUninitialized: true
}));

// Routing
require('./config/routes')(app, express);

io.on('connection', function (socket) {
  //do something on connection
  // socket.emit();
  //event listener
  // socket.on('my other event', function (data) {
  // });
  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});
app.listen(app.get('port'), function() {
  console.log('Server listening on port ', app.get('port'));
});
