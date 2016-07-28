var mongoose = require('mongoose');

var SongSchema = mongoose.Schema({
  data: {
    type: String
  }
});

var Song = mongoose.model('Song', SongSchema);

module.exports = Song;