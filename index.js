var app     = require('./app/app.js'),
    server  = app.listen(app.get('port')),
    io      = require('socket.io').listen(server);

require('./app/config/sockets.js')(io);

console.log('Listening on ' + app.get('url') + ':' + app.get('port') );