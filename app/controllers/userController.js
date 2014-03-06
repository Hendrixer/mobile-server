var User      = require('../models/user.js'),
    Q         = require('q'),
    speakeasy = require('speakeasy'),
    client    = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN),
    jwt       = require('jwt-simple');

module.exports = {
  create: function(req, res, next){
    if(req.user){
      res.send(user);
    }
    var query = {
      number: req.body.number
    };

    User.findOneOrCreateOne(query)
    .then(sendVerificaton)
    .then(function(response){
      res.json(response);
    })
    .fail(function(err){
      next(err);
    })
    .done();
  },

  delete: function(req, res, next){
    User.findOneAndRemove({_id: req.user._id}, function(err, user){
      if(err){
        next(err);
      }
      else if(user){
        res.json({_id:user._id});
      } else {
        res.json({user: 'no user'});
      }
    });
  },

  verify: function(req, res, next){
    var code    = req.body.code,
        number  = req.body.number;
        user    = {code: code, number: number};

    verifyNumber(user)
    .then(function(user){
      var tokenObj = {
        number: user.number,
        _id: user._id,
        verified: user.verified
      };
      var token = jwt.encode(tokenObj, process.env.JWT_SECRET);
      res.json({token: token});
    })
    .fail(function(err){
      next(err);
    });
  },

  update: function(req, res, next){
    var number = req.body.number,
        id     = req.user._id;

    User.findByIdAndUpdate(id, {number: number}, function(err, user){
      if(err){
        next(err);
      } else if(user){
        var token = jwt.encode(user, process.env.JWT_SECRET);
        res.json({token: token});
      } else {
        res.json({user: 'no user'});
      }
    });
  }
};


var sendVerificaton = function(newUser){
  var deferred  = Q.defer();

  client.sendMessage({
    to: newUser.number,
    from: process.env.TWILIO_NUMBER,
    body: 'Verificication code: '+ newUser.code
  }, function(smsErr, response){
    if(smsErr){
      var err = new Error(smsErr);
      err.message = smsErr.message;
      deferred.reject(err);
    } else {
      var sendBack = {};
      sendBack.number = newUser.number;
      sendBack.response = response.message;
      deferred.resolve(sendBack);
    }
  });
  return deferred.promise;
};

var verifyNumber = function(client){
  var deferred  = Q.defer(),
      number    = client.number,
      sentCode  = parseInt(client.code);

  User.findOne({number: number}, function(finderr, user){
    if(finderr){
      deferred.reject(finderr);
    } else if(user){
      if(user.code === sentCode){
        user.verified = true;
        user.save(function(saverr, user){
          if(saverr){
            deferred.reject(saverr);
          } else {
            deferred.resolve(user);
          }
        });
      } else {
        var codeError = new Error('Invalid Verificication Code');
        deferred.reject(codeError);
      }
    }
  });
  return deferred.promise;
};