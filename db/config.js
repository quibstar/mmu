var config = {};

config.mongoURI = {
  development: 'mongodb://localhost:27017/mommy-meetups-dev',
  test: 'mongodb://localhost:27017/mommy-meetups-test',
  production: process.env.MONGODB_URI,
};

module.exports = config;
