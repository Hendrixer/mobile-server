var jwt = require('jwt-simple');

module.exports = {
  logError: function(err, req, res, next){
    console.error(err.stack);
    next(err);
  },

  errorHandler: function(err, req, res, next){
    res.send(500);
  },

  decode: function(req, res, next){
    if(!req.headers.token) return next(new Error('no token'));
    var token = jwt.decode(req.headers.token, 'baconbits');
    req.user = {
      number: token.number,
      _id: token._id
    };
    next();
  }
};