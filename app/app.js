var express       = require('express'),
    mongoose      = require('mongoose'),
    app           = express(),
    test          = require('supertest');


require('./config/db.js')(mongoose);
require('./config/server.js')(app, express);
require('./routes/userRoutes.js')(app);


// test(app)
//     .get('/api/user/delete')
//     .set('Token', 'thing')
//     .end(function(err, res){
//       console.log(res.body);
//     });

module.exports = app;
