const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var User = require('../models/user');

before(done => {
  var user = new User({
    email: 'quibstar@gmail.com',
    firstName: 'Kris',
    lastName: 'Utter',
    password: 'p',
    tos: true,
  });
  user.save(function(err) {
    done();
  });
});

after(done => {
  User.collection.drop();
  done();
});
