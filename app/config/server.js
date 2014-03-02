
module.exports = function(app, passport, express){

  app.configure('development', function(){
    app.set('port', process.env.PORT || 3000);
    app.set('url', process.env.URL || 'http://localhost');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    // app.use(errorHandler);
    app.use(express.session({secret: 'ninja turtle'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    // app.use(express.static(__dirname + '/../../public'));

  });
}