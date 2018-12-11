const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  firstName: String,
  lastName: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordSentAt: Date,
  stripeToken: String,
  chargeId: String,
  sourceId: String,
  tos: Boolean,
  created: Date,
  updated: { type: Date, default: Date.now },
  address: String,
  city: String,
  state: String,
  zip: String,
  dateOfBirth: Date,
});

// on save hook encrypt
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(submittedPassword, callback) {
  bcrypt.compare(submittedPassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

userSchema.index({ accountId: 1 });

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
