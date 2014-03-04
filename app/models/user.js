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

  password: {
    type: String,
    required: true
  },

  salt: {
    type: String,
    required: true
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

  status: String

});


UserSchema.pre('save', function(next){
  var user = this;
  console.log('here');
  if(!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err);
      user.password = hash;
      user.salt = salt;
      return next();
    });
  });
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
        number: query.number,
        password: query.password,
        salt: 'null'
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