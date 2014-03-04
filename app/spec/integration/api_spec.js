var req    = require('supertest'),
    expect = require('expect.js'),
    app    = require('../../app.js');

describe('API Server', function(){
  it('Should not grant access without a Client ID', function(done){
    req(app)
    .post('/api/v1/user/new')
    .send({number: '123'})
    .end(function(err, res){
      expect(res.statusCode).to.be(401);
      expect(res.body).to.be.empty();
      done();
    });
  });

  it('Should not grant access with wrong Client ID', function(done){
    req(app)
    .post('/api/v1/user/new')
    .send({number: '123'})
    .set('client-id', 'test')
    .end(function(err, res){
      expect(res.statusCode).to.be(401);
      expect(res.body).to.be.empty();
      done();
    });
  });
});