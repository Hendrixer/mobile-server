process.env.NODE_ENV = 'test';

var req    = require('supertest'),
    expect = require('expect.js'),
    app    = require('../../app.js');

describe('API Server', function(){

  var ID = process.env.CLIENT_MOBILE_ID;

  describe('POST /api/v1/user/new', function(){

    it('Should not grant access without a Client ID', function(done){
      req(app)
      .post('/api/v1/user/new')
      .send({number: '6197109556'})
      .end(function(err, res){
        expect(res.statusCode).to.be(401);
        expect(res.body).to.be.empty();
        done();
      });
    });

    it('Should not grant access with wrong Client ID', function(done){
      req(app)
      .post('/api/v1/user/new')
      .send({number: '6197109556'})
      .set('client-id', ID + 'nope')
      .end(function(err, res){
        expect(res.statusCode).to.be(401);
        expect(res.body).to.be.empty();
        done();
      });
    });

    it('Should grant access with correct Client ID and no Token', function(done){
      req(app)
      .post('/api/v1/user/new')
      .send({number: '619'}) // invalid number on purpose
      .set('client-id', ID)
      .end(function(err, res){
        expect(err).to.be(null);
        expect(res.body).to.be.empty();
        expect(res.statusCode).to.be(500);
        done();
      });
    });
  });
});