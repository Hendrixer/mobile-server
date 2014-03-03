var auth   = require('./auth.js');


module.exports = function(app, express){

  app.configure('development', function(){
    app.set('port', process.env.PORT || 3000);
    app.set('url', process.env.URL || 'http://localhost');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use('/api', auth.decode);
    app.use(auth.logError);
    app.use(auth.errorHandler);
    app.use(app.router);
  });
};