var user = require('../controllers/userController.js');


module.exports = function(app, socket){
  app.post('/api/v1/user/new', user.create);
  app.get('/api/v1/user/delete', user.delete);
  app.post('/api/v1/user/update', user.update);
  app.get('/api/v1/user', user.get);
};