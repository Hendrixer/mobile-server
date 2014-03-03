var user = require('../controllers/userController.js');


module.exports = function(app, passport){
  app.post('/signup', user.create);
  app.get('/api', user.get);
};