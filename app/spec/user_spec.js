var req = require('request');


describe('server', function(){
  describe('GET /', function(){
    it('Should should respond', function(done){
      req.get('http://localhost:3000', function(err, res, body){
        body = JSON.parse(body);
        expect(body).toEqual({test: 'testing'});
        expect(res.statusCode).toEqual(200);
        done();
      });
    });
  });
});