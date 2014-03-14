"use strict";

module.exports = function(socket){
  socket.emit('connected', {message: 'connected'});
};