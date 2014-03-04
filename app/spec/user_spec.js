var req    = require('supertest'),
    expect = require('expect.js'),
    app    = require('../app.js');

describe('User Auth', function(){

  var token;
  var client = 'mobile';

  it('Should sign up new user', function(done){
    req(app)
    .post('/api/v1/user/new')
    .set('client-id', client)
    .send({number: '1234', password: '1234'})
    .end(function(err, res){
      expect(err).to.be(null);
      expect(res.body).to.be.an('object');
      expect(res.body.token).to.be.a('string');
      expect(res.statusCode).to.be(200);
      token = res.body.token;
      done();
    });
  });

  it('Should delete a user', function(done){
    req(app)
    .get('/api/v1/user/delete')
    .set('token', token)
    .set('client-id', client)
    .end(function(err, res){
      expect(err).to.be(null);
      expect(res.statusCode).to.be(200);
      done();
    });
  });
});