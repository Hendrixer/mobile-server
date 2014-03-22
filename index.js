"use strict";

var app     = require('./app/app.js'),
    server  = app.listen(app.get('port')),
    ioAuth  = require('socketio-jwt'),
    io      = require('socket.io').listen(server);

// io.set('log level', 1);

io.set('authorization', ioAuth.authorize({
  secret: process.env.JWT_SECRET,
  handshake: true
}));

io.sockets.on('connection', require('./app/routes/socket.js'));

// io.sockets.on('disconnect', fun);

console.log('Listening on ' + app.get('url') + ':' + app.get('port'));