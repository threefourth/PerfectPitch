var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var UserSchema = mongoose.Schema({
  username: {
    type: String, 
    unique: true, 
    required: true
  },
  password: {
    type: String,
    required: true
  },
  scores: [{
    title: String,
    score: Number 
  }]
});

UserSchema.methods.comparePasswords = function(inputPassword) {
  var user = this;
  console.log('user: ', user);
  return new Promise(function(resolve, reject) {
    bcrypt.compare(inputPassword, user.password, function(err, result) {
      console.log("result: ", result);
      console.log("err is: ", err);
      if (err) {
        console.log('-----err-----');
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      throw err;
    }
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        throw err;
      }
      user.password = hash;
      next();
    });
  });
});

var User = mongoose.model('User', UserSchema);

// initialize user collection with one instance
User.findOne({username: 'jae'}, function(err, users) {
  if (!users) {
    User.create({
      username: 'jae',
      password: 'jae',
      scores: [
        {
          title: 'God Only Knows',
          score: 85
        },
        {
          title: '7 Years',
          score: 73
        },
        {
          title: 'Wonderwall',
          score: 94
        },
        {
          title: 'Hotel California',
          score: 89
        },
        {
          title: 'Smells Like Teen Spirit',
          score: 98
        }
      ]
    });
  }
});

module.exports = User;
