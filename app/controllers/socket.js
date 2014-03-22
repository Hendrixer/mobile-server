"use strict";

var User  = require('../models/user.js'),
    Chat  = require('../models/chat.js');


module.exports = function(socket){

  return {
    // subscribe: function(data){
    //   var user = socket.handshake.decode_token._id;
    //   User.findOneByPhoneNumber(data.number)
    //   .then(function(invited){
    //     return newChat(user, invited._id);
    //   })
    //   .then(function(chat){
    //     socket.join(chat._id);
    //   })
    //   .fail(function(error){
    //     throw error;
    //   });
    // }

    subscribe: function(data){
      console.log(socket.handshake.decoded_token.number);
      socket.join(data.room);
      socket.broadcast.to(data.room).emit('joined');
    },
    unsubscribe: function(data){
      console.log('Leaving room');
      socket.leave(data.room);
      socket.broadcast.to(data.room).emit('left');
    },

    sendMessage: function(data){
      socket.broadcast.to(data.room).emit('get message', {message: data.message});
    }
  };
};


var newChat = function(userID, invitedID){
  var newChat = new Chat({
    started: userID,
    invited: invitedID
  });

  newChat.save(function(err, chat){
    if(err){
      throw err;
    }
  });
};