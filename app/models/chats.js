"use strict";

var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
    ObjectId  = Schema.ObjectId;

var ChatSchema = new Schema({
  started: {
    type: ObjectId,
    ref: "User",
    required: true
  },

  invited: {
    type: ObjectId,
    ref: 'User'
  },

  messages: [{type: ObjectId, ref: 'message'}]
});

module.exports = mongoose.model('Chat', ChatSchema);