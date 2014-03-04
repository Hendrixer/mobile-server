var app     = require('./app.js'),
    server  = app.listen(app.get('port')),
    io      = require('socket.io').listen(server);

require('./config/sockets.js')(io);

console.log('Listening on ' + app.get('url') + ':' + app.get('port') );