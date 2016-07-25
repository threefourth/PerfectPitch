var isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

var checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    res.status(500).send({error: 'user not logged in'});
  } else {
    next();
  }
};

var createSession = function(req, res, user) {
  return req.session.regenerate(function() {
    req.session.user = user;
    res.status(200).send(user);
  });
};

module.exports = {
  createSession: createSession,
  checkUser: checkUser,
  isLoggedIn: isLoggedIn
};