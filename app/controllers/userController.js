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

  delete: function(req, res){
    console.log('user', req.user);
    User.findOneAndRemove({_id: req.user._id}, function(err, user){
      if(err){
        throw new Error(err);
      }
      else if(user){
        res.json(user);
      } else {
        res.json({user: null});
      }
    });
  },

  get: function(req, res){
    console.log(req.user);
    res.json(req.user);
  }
};