"use strict";

var express       = require('express'),
    mongoose      = require('mongoose'),
    app           = express();

require('./config/server.js')(app, express);
require('./config/db.js')(app, mongoose);
require('./routes/user.js')(app);


module.exports = app;
