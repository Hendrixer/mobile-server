var request   = require('supertest'),
    app       = require('../app.js'),
    expect    = require('expect.js');


describe('auth', function(){
  describe('POST /signup', function(){
    it('Should should respond', function(done){
      request('http://678889:ballin35@localhost:3000')
      .post('/signup')
      .end(function(err, res){
        expect(err).to.be(null);
        return done();
      });
    });
  });
});