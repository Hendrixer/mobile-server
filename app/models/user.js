var mongoose  = require('mongoose'),
    Q         = require('q'),
    Schema    = mongoose.Schema,
    ObjectId  = Schema.ObjectId;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
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

  status: String

});


module.exports = mongoose.model('User', UserSchema);