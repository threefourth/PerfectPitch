var path = require('path');

module.exports = function(app, express) {

  app.get('/placesList', function(req, res) {
    Place.find().then(function(places) {
      res.send(places);
    });
  });

  app.post('/createNewPlace', function(req, res) {
    var place = req.body;
    Place.create({name: place.name, time: place.time, menus: place.menus})
      .then(place => res.status(201).end())
      .catch(error => res.status(500).send({error: error.message}));
  });

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

  app.post('/signinUser', function(req, res) {
    var user = req.body;
    User.findOne({username: user.username})
      .then(function(result) {
        console.log('result is: ', result);
        if (result) {
          result.comparePasswords(user.password)
            .then(function(match) {
              if (match) {
                util.createSession(req, res, result);
              } else {
                res.status(500).send({error: 'user already exists!'});
              }
            })
            .catch(function(err) {
              console.log('error in comparePasswords');
              res.status(500).send({error: 'error in comparing passwords'});
            });
        } else {
          res.status(500).send({error: 'user does not exist'});
        }
      });
  });

  app.get('/signoutUser', function(req, res) {
    req.session.destroy(function() {
      res.status(200).send({success: 'successfully signed out!'});
    });
  });

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });
};

