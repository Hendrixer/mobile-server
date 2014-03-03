var express       = require('express'),
    mongoose      = require('mongoose'),
    app           = express(),
    test          = require('supertest');


require('./config/db.js')(mongoose);
require('./config/server.js')(app, express);
require('./routes/userRoutes.js')(app);


module.exports = app;
