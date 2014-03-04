var user = require('../controllers/userController.js');


module.exports = function(app, passport){
  app.post('/user/new', user.create);
  app.get('/api/user/delete', user.delete);
  app.get('/api', user.get);
};