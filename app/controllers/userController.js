var User    = require('../models/user.js'),
    jwt     = require('jwt-simple');

module.exports = {
  create: function(req, res){
    var query = {
      number: req.body.number,
      password: req.body.password
    };

    User.findOneOrCreateOne(query)
    .then(function(user){
      var token = jwt.encode(user, 'baconbits');
      res.json({token: token});
    }).fail(function(err){
      throw new Error(err);
    });
  },
  get: function(req, res){
    console.log(req.user);
    res.json(req.user);
  }
};