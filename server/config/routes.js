var path = require('path');
var User = require('../models/user');
var util = require('./util');

module.exports = function(app, express) {

  app.get('/checkUser', function(req, res) {
    if (util.isLoggedIn(req)) {
      res.send(req.session.user);
    } else {
      res.send(JSON.stringify(null));
    }
  })

  app.post('/signupNewUser', function(req, res) {
    var user = req.body;
    User.findOne({username: user.username})
      .then(function(result) {
        if (result) {
          res.status(500).send({error: 'user already exists!'});
        } else {
          User.create({username: user.username, password: user.password})
            .then(function(user) {
              util.createSession(req, res, user);
            });
        }
      });
  });

  app.post('/loginUser', function(req, res) {
    var user = req.body;
    User.findOne({username: user.username})
      .then(function(result) {
        if (result) {
          result.comparePasswords(user.password)
            .then(function(match) {
              if (match) {
                util.createSession(req, res, result);
              } else {
                alert("Wrong username or password!");
                res.status(500).send({error: 'wrong username or password'});
              }
            })
            .catch(function(err) {
              res.status(500).send({error: 'error in comparing passwords'});
            });
        } else {
          alert("That username does not exist!");
          res.status(500).send({error: 'user does not exist'});
        }
      });
  });

  app.get('/signoutUser', util.checkUser, function(req, res) {
    req.session.destroy(function() {
      res.status(200).send({success: 'successfully signed out!'});
    });
  });

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });


  app.post('/updateScore', function(req, res) {
    var user = req.body;
    var query = {username: user.username};
    User.findOne(query)
      .then(function(result) {
        var notFind = true; 
        for (var i = 0; i < result.scores.length; i++) {
          if (result.scores[i].title === user.title) {
            result.scores[i].score = user.score;     
            notFind = false;      
          }
        }
        if (notFind) {
          result.scores.push({
            title: user.title, 
            score: user.score
          });
        }
        result.save(function(err, doc) {
          if (err) {
            res.status(500);
            console.log(err);
          }
          console.log(doc);
        });
      });
  });

};

