process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

describe.only('Sign up API', function() {
  it('Should 422 if account is empty', function(done) {
    chai
      .request(server)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send({ password: 'p' })
      .end(function(err, res) {
        res.body.should.be.a('object');
        res.body.error.should.equal('Please recheck the form');
        res.should.have.status(422);
        done();
      });
  });

  it('Should reject if account is in use', function(done) {
    chai
      .request(server)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send({
        email: 'quibstar@gmail.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'p',
      })
      .end(function(err, res) {
        res.body.should.be.a('object');
        res.should.have.status(422);
        res.body.error.should.equal('Email in use');
        done();
      });
  });

  it('Should be a successful sign in', function(done) {
    chai
      .request(server)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send({
        email: 'kris@vianet.us',
        firstName: 'Test',
        lastName: 'User',
        password: 'passwordIsValid@1',
        tos: true,
      })
      .end(function(err, res) {
        res.body.should.be.a('object');
        res.should.have.status(200);
        done();
      });
  });
});
