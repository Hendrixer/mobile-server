var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var ClientSchema = new Schema({
  platform: {
    type: String,
    uniquie: true,
    required: true
  },
  token: {
    type: String,
    uniquie: true,
    required: true
  }
});


module.exports = mongoose.model('Client', ClientSchema);