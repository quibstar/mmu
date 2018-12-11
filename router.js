const Authentication = require('./controllers/authentication');
require('./services/passport'); // dont delete needed
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// controllers
const User = require('./controllers/users');
const AWS = require('./services/aws');

module.exports = function(app) {
  app.get('/api/server-test', function(req, res, next) {
    res.send("I'm working");
  });

  app.post('/api/v1/reset-password', User.sendResetPassword);
  app.post('/api/v1/reset-password-confirm', User.resetPassword);
  app.get('/api/v1/profile', requireAuth, User.profile);
  app.put('/api/v1/profile/:id', requireAuth, User.update);
  app.post('/api/v1/signup', Authentication.signup);
  app.post('/api/v1/signin', requireSignin, Authentication.signin);
};
