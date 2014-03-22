"use strict";

module.exports = function(socket){
  var controller = require('../controllers/socket.js')(socket);

  socket.emit('connected', {message: 'connected'});

  socket.on('subscribe', controller.subscribe);

  socket.on('unsubscribe', controller.unsubscribe);

  socket.on('send message', controller.sendMessage);
};