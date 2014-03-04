var User    = require('../models/user.js'),
    jwt     = require('jwt-simple');

module.exports = {
  create: function(req, res){

    var query = {
      number: req.body.number
    };

    User.findOneOrCreateOne(query)
    .then(function(user){
      var token = jwt.encode(user, process.env.JWT_SECRET);
      res.json({token: token});
    }).fail(function(err){
      throw new Error(err);
    });
  },

  delete: function(req, res){
    User.findOneAndRemove({_id: req.user._id}, function(err, user){
      if(err){
        throw new Error(err);
      }
      else if(user){
        res.json({_id:user._id});
      } else {
        res.json({user: 'no user'});
      }
    });
  },

  get: function(req, res){
    res.json(req.user);
  },

  update: function(req, res){
    var number = req.body.number,
        id     = req.user._id;

    User.findByIdAndUpdate(id, {number: number}, function(err, user){
      if(err){
        throw new Error(err);
      } else if(user){
        var token = jwt.encode(user, process.env.JWT_SECRET);
        res.json({token: token});
      } else {
        res.json({user: 'no user'});
      }
    });
  }
};