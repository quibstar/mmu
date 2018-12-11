const jwt = require('jwt-simple');
const User = require('../models/user');
const Emailer = require('../services/email');

function jwtForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
}

exports.jwtForUser = jwtForUser;

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  if (!email || !password || !firstName || !lastName) {
    return res.status(422).send({ error: 'Please recheck the form' });
  }

  // check for use
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email in use' });
    }

    const user = new User({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      tos: true,
    });

    user.save(function(err) {
      if (err) {
        return next('err');
      }
      // send welcome email
      Emailer.welcomeEmail(user);
      res.json({ token: jwtForUser(user) });
    });
  });
};

exports.signin = function(req, res, next) {
  // already authenticated, send a token
  res.send({
    token: jwtForUser(req.user),
  });
};
