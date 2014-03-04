
module.exports = function(io){
  io.sockets.on('connection', function(socket){
    socket.emit('chat', {message: 'on chat'});
    socket.on('get chat', function(data){
      console.log(data);
    });
  });
};