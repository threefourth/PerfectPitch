var express = require('express');
var http = require('http');

// MongoDB connection
var http = require('http');
var db = require('./db/db');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = (process.env.PORT || 8000);
server.listen(port);

var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var User = require('./models/user');

// MongoDB connection
var db = require('./db/db.js');
var Song = require('./models/song.js');
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

var clients = {};

//Socket listeners
io.on('connection', function (socket) {
  clients[socket.id] = socket;

  console.log(socket.id + ' connected!')

  socket.on('songClicked', function (data) {
    io.emit('songClick', data);
  });

  socket.on('played', function(event){
    socket.broadcast.emit('played', event);
  });

  socket.on('paused', function (event) {
    socket.broadcast.emit('paused', event);
  })

  socket.on('stopped', function (userObj) {
    console.log(userObj);
    console.log('server song stopped!')
    socket.broadcast.emit('stopped', userObj);

    User.findOne({username: userObj.username})
      .then(function(result) {
        var notFind = true; 
        for (var i = 0; i < result.scores.length; i++) {
          if (result.scores[i].title === userObj.title) {
            result.scores[i].score = Math.max(userObj.score, result.scores[i].score);     
            notFind = false;      
          }
        }
        if (notFind) {
          result.scores.push({
            title: userObj.title, 
            score: userObj.score
          });
        }
        result.save(function(err, doc) {
          if (err) {
            console.log(err);
          }
          console.log(doc);
        });
      });
  })

  socket.on('data', function(data) {
    socket.broadcast.emit('update', data);
  });

  socket.on('playerData', function (data) {
    io.emit('playerNote', data);
  });
  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
  socket.on('pitchData', function (data) {
    console.log('hey');
  });
});
