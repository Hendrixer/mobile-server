var express       = require('express'),
    passport      = require('passport'),
    mongoose      = require('mongoose'),
    app           = express();


require('./config/db.js')(mongoose);
// require('./config/passport.js')(passport);
require('./config/server.js')(app, passport, express);
require('./routes/userRoutes.js')(app, passport);

module.exports = app;
