var express = require('express');
<<<<<<< c6c3ce9dabeed06f899c2abe3eb08990ad72f54f
var http = require('http');
<<<<<<< 4f21d606c063e39518a93b29191c55d148538ab5
<<<<<<< 8bdb5bc66fa30672418937138e7a25a26679e774
// MongoDB connection
=======
var io = require('socket.io')(app);
// MongoDB connection
var http = require('http');
var http = require('http');
>>>>>>> Adding Socket functionality
=======
<<<<<<< c47498f3b030d3aa758756057caa6709b3287c4a
var io = require('socket.io')(app);
// MongoDB connection
var http = require('http');
var io = require('socket.io')(app);
// MongoDB connection
>>>>>>> Initial set up of Socket.io
var db = require('./db/db');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(8000);

var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');


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

var clients = {};

//Socket listeners
io.on('connection', function (socket) {
  clients[socket.id] = socket;

  console.log(socket.id + ' connected!')

  socket.on('songClicked', function (data) {
    console.log('socket connected!')
    io.emit('songClick', data);
  });

  socket.on('onPlay', function(event){
    socket.broadcast.emit('onPlay', event);
  });

  socket.on('paused', function (event) {
    socket.broadcast.emit('paused', event);
  })

  socket.on('stopped', function (event) {
    console.log('server song stopped!')
    socket.broadcast.emit('stopped', event);
  })

  socket.on('data', function(data) {
    socket.broadcast.emit('update', data);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
    delete clients[socket.id];
  });
  socket.on('playerData', function (data) {
    io.emit('playerNote', data);
  });
});
// app.listen(app.get('port'), function() {
//   console.log('Server listening on port ', app.get('port'));
// });
