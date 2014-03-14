"use strict";

var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
    ObjectId  = Schema.ObjectId;

var MessageSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: 'true'
  },

  text: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Message', MessageSchema);