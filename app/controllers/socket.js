"use strict";

module.exports = function(socket){

  return {
    // subscribe to new room
    subscribe: function(data){
      socket.join(data.room);
      socket.broadcast.to(data.room).emit('joined');
    },

    // leave given room
    unsubscribe: function(data){
      console.log('Leaving room');
      socket.leave(data.room);
      socket.broadcast.to(data.room).emit('left');
    },

    // send message to all users in current room
    sendMessage: function(data){
      socket.broadcast.to(data.room).emit('get message', {message: data.message});
    }

    // sendMedia: function(data){
    //   var file = data.media;

    // }
  };
};
