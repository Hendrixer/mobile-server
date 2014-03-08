var user = require('../controllers/user.js');


module.exports = function(app){
  app.post('/api/v1/user/new', user.create);
  app.get('/api/v1/user/delete', user.delete);
  app.post('/api/v1/user/update', user.update);
  app.post('/api/v1/user/verify', user.verify);
};