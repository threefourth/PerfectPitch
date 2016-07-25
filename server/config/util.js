var isLoggedIn = function(req) {
  console.log('req.session is: ', req.session);
  console.log('req.session.user is: ', req.session.user);
  return req.session ? !!req.session.user : false;
};

var checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    console.log('-----User not logged in-----');
    res.status(500).send({error: 'user not logged in'});
  } else {
    console.log('-----User is logged in-----');
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
  checkUser: checkUser
};