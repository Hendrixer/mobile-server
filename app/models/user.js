"use strict";

var mongoose  = require('mongoose'),
    speakeasy = require('speakeasy'),
    Q         = require('q'),
    Schema    = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    sparse: true,
    index: true
  },

  number: {
    type: String,
    required: true,
    unique: true
  },

  verified: {
    type: Boolean,
    default: false
  },

  code: Number,

  settings: {
    profile: {
      pic: String
    }
  },

  status: String

});

UserSchema.statics.findByPhoneNumber = function(number){
  var deferred  = Q.deferred(),
      User      = mongoose.model('User');

  User.findOne({number: number}, function(err, user){
    if(err){
      deferred.reject(err);
    } else if (!user){
      deferred.reject(new Error('No user by that number'));
    } else {
      deferred.resolve(user);
    }
  });
  return deferred.promise;
};

UserSchema.statics.findOneOrCreateOne = function(query){
  var deferred  = Q.defer(),
      User      = mongoose.model('User');

  User.findOne(query, function(finderr, user){
    if(finderr){
      deferred.reject(finderr);
    } else if(user){
      deferred.resolve(user);
    } else {
      var code = speakeasy.totp({key:'abcd123', step: 5, length: 4});
      var newUser = new User({
        number: query.number,
        code: parseInt(code)
      });
      newUser.save(function(err, user){
        if(err){
          deferred.reject(err);
        } else {
          deferred.resolve(user);
        }
      });
    }
  });
  return deferred.promise;
};

module.exports = mongoose.model('User', UserSchema);