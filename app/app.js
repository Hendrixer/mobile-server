var express       = require('express'),
    mongoose      = require('mongoose'),
    passport      = require('passport');

mongoose.connect('mongodb://localhost/ionic');
var db = mongoose.connection;
db.on('open', console.log.bind(console, 'connected to mongo'));
db.on('error', console.error.bind(console, 'error connecing to mongo'));

var app = express();

// require('./config/passport.js')(passport);
require('./config/server.js')(app, passport, express);
require('./routes/userRoutes.js')(app, passport);

module.exports = app;
