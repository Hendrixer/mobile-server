var mongoose  = require('mongoose'),
    bcrypt    = require('bcrypt'),
    Q         = require('q'),
    Schema    = mongoose.Schema,
    ObjectId  = Schema.ObjectId;

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

  settings: {
    profile: {
      pic: String
    }
  },

  groups: [{type: ObjectId, ref: 'Group'}],

  conversations: [{type: ObjectId, ref: 'Converstation'}],

  status: String

});


UserSchema.statics.findOneOrCreateOne = function(query){
  var deferred   = Q.defer(),
      User       = mongoose.model('User');

  User.findOne({number: query.number}, function(err, user){
    if(err){
      deferred.reject(err);
    } else if(user){
      deferred.resolve(user);
    } else {
      var newUser = new User({
        number: query.number
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