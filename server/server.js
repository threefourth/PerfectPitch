var express = require('express');
var http = require('http');
var db = require('./db/db');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(8000);

var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

// var io = require('socket.io')(app);

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
  console.log('socket connected!')
  socket.on('songClicked', function (data) {
    console.log('event-server recieved!')
    io.emit('songClick', data);
  });
  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
  socket.on('onPlay', function(event){
    socket.broadcast.emit('onPlay', event);
  });
  socket.on('playerData', function (data) {
    io.emit('playerNote', data);
  });
});
// app.listen(app.get('port'), function() {
//   console.log('Server listening on port ', app.get('port'));
// });
