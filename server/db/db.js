var mongoose = require('mongoose');
var Promise = require('bluebird');

mongoose.Promise = Promise;
mongoose.connect('mongodb://threefourth:34awesomebullets@ds029725.mlab.com:29725/threefourth');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.once('open', function() {
  console.log('MongoDB connection is now open!');
});

module.exports = db;