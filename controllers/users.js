const Authentication = require('./authentication');
const User = require('../models/user');
const Emailer = require('../services/email');
const TokenStore = require('../services/token-store');

tokenAlreadyExists = function(token) {
  User.findOne({ resetPasswordToken: token }, function(existingToken) {
    if (existingToken) {
      return true;
    }
    return false;
  });
};

exports.checkForToken = tokenAlreadyExists;

exports.profile = function(req, res, next) {
  User.findOne({ _id: req.user._id })
    .then(user => {
      res.json({
        user: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          plan: user.plan,
          city: user.city,
          state: user.state,
          zip: user.zip,
          dateOfBirth: user.dateOfBirth,
          chargeId: user.chargeId,
          sourceId: user.sourceId,
        },
      });
    })
    .catch(err => {
      res.json({ error: 'record not found' });
    });
};

exports.resetPassword = function(req, res, next) {
  const token = req.body.token;
  const password = req.body.password;

  User.findOneAndUpdate({ resetPasswordToken: token }, { $set: { password: password } }, { new: true }, function(
    err,
    user
  ) {
    if (err) {
      return err;
    }

    if (!user) {
      return res.status(404).send({ error: 'User Not Found' });
    }

    var token = Authentication.jwtForUser(user);
    user.resetPasswordToken = '';
    user.resetPasswordSentAt = null;
    user.save();
    res.json({ token: token });
  });
};

exports.sendResetPassword = function(req, res, next) {
  const email = req.body.email;
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(422).send({ error: 'Please check your email' });
    }

    // verify unique token
    var token = '';
    var uniqueToken = true;
    while (uniqueToken) {
      token = (Math.random() * 1e64).toString(36);
      uniqueToken = tokenAlreadyExists(token);
    }

    user.resetPasswordToken = token;
    user.resetPasswordSentAt = Date.now();

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      // send reset email
      Emailer.sendResetPasswordEmail(user, token);
      res.json({ user: user });
    });
  });
};

exports.update = function(req, res, next) {
  const id = req.body._id;
  var user = req.body;
  User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        city: user.city,
        state: user.state,
        zip: user.zip,
        dateOfBirth: user.dateOfBirth,
      },
    },
    { new: true },
    function(err, user) {
      if (err) {
        if (err.code === 11000) {
          return res.status(404).send({ error: 'Email already in use' });
        } else {
          return res.status(404).send({ error: 'Something went wrong. Please try again' });
        }
      } else {
        if (!user) {
          return res.status(404).send({ error: 'User Not Found' });
        }
        if (req.body.password) {
          user.password = req.body.password;
          user.save();
        }
        res.json({ user: user });
      }
    }
  );
};

exports.delete = function(req, res, next) {
  User.findByIdAndRemove({ _id: req.query.id })
    .then(() => {
      res.json({ message: 'User deleted' });
    })
    .catch(err => {
      res.json({ error: 'record not be removed' });
    });
};
