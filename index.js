var app     = require('./app/app.js'),
    server  = app.listen(app.get('port')),
    io      = require('socket.io').listen(server);

io.sockets.on('connection', require('./app/routes/socket.js'));

console.log('Listening on ' + app.get('url') + ':' + app.get('port') );