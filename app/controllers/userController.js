var User    = require('../models/user.js');


module.exports = {
  test: function(req, res){
    res.json({test: 'testing'});
  }
};