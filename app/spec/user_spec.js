var req    = require('supertest'),
    expect = require('expect.js'),
    app    = require('../app.js');

describe('auth', function(){
  it('Should sign up new user', function(done){
    req(app)
    .post('/signup')
    .send({number: '1234', password: '1234'})
    .end(function(err, res){
      expect(err).to.be(null);
      expect(res.body).to.be.an('object');
      expect(res.body.token).to.be.a('string');
      expect(res.statusCode).to.be(200);
      done();
    });
  });
});