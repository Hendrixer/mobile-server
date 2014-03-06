var req    = require('supertest'),
    expect = require('expect.js'),
    app    = require('../../app.js');

describe('User Auth', function(){

  var token;
  var client = process.env.CLIENT_MOBILE_ID;

  it('Should sign up new user', function(done){
    req(app)
    .post('/api/v1/user/new')
    .set('client-id', client)
    .send({number: '1234'})
    .end(function(err, res){
      expect(err).to.be(null);
      expect(res.statusCode).to.be(500);
      token = res.body.token;
      done();
    });
  });

  it('Should update a user number', function(done){
    req(app)
    .post('/api/v1/user/update')
    .set('client-id', client)
    .set('token', token)
    .send({number: '678-616-9090'})
    .end(function(err, res){
      expect(err).to.be(null);
      expect(res.statusCode).to.be(200);
      expect(res.body.token).to.be.a('string');
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
      expect(res.body._id).to.be.a('string');
      done();
    });
  });
});