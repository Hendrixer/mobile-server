"use strict";

module.exports = function(socket, io){
  socket._phone = socket.handshake.decoded_token.number;

  var controller = require('../controllers/socket.js')(socket, io);

  socket.emit('connected', {message: 'connected'});

  socket.on('subscribe', controller.subscribe);

  socket.on('unsubscribe', controller.unsubscribe);

  socket.on('send message', controller.sendMessage);

};