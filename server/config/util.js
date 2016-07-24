var createSession = function(req, res, user) {
  return req.session.regenerate(function() {
    req.session.user = user;
    res.status(200).send();
  });
};

module.exports.createSession = createSession;