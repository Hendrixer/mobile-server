var config = require('./middleware.js');


module.exports = function(app, express){

  app.configure('development', function(){
    app.set('port', process.env.PORT || 3000);
    app.set('url', process.env.URL || 'http://localhost');
    app.set('db uri', process.env.MONGOHQ_URL || 'mongodb://localhost/ionic');
    app.use(config.enableCors);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use('/api', config.clientCheck);
    app.use('/api', config.decode);
    app.use(app.router);
    app.use(config.logError);
    app.use(config.errorHandler);
    app.use(express.static(__dirname + '/../public/'));
  });

  app.configure('test', function(){
    app.set('port', process.env.PORT || 3000);
    app.set('url', process.env.URL || 'http://localhost');
    app.set('db uri', 'mongodb://localhost/testing');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(config.enableCors);
    app.use('/api', config.clientCheck);
    app.use('/api', config.decode);
    app.use(app.router);
    app.use(config.errorHandler);
    app.use(express.static(__dirname + '/../public/'));
  });
};