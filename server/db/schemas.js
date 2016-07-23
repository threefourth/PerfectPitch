var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	id: { type: Number, require: true, unique: true },
	username: { type: String, require: true, unique: true },
	email: { type: String, require: true, unique: true },
 	password: { type: String, require: true }
});

var HighScoreSchema = new Schema({
	score: Number,
	username: String,
	song: String
});

module.exports = {
	user: mongoose.model('user', UserSchema),
	highScore: mongoose.model('highScore', HighScoreSchema)
};
