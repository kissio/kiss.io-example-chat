'use strict';

module.exports =
{
  onNewMessage: onNewMessage
, onLogin: onLogin
, onTyping: onTyping
, onStopTyping: onStopTyping
, onDisconnect: onDisconnect
};


function onNewMessage(data)
{
  var socket = this.socket;

  socket.broadcast('new message', {
    username: socket.username,
    message: data
  });
}

function onLogin(username)
{
  var Chat = this.nsp;
  var socket = this.socket;

  if (socket.addedUser) return;

  // we store the username in the socket session for this client
  socket.username = username;

  ++Chat.numUsers;
  socket.addedUser = true;

  socket.emit('login', {
    numUsers: Chat.numUsers
  });

  // echo globally (all clients) that a person has connected
  socket.broadcast('user joined', {
    username: socket.username,
    numUsers: Chat.numUsers
  });
}

function onTyping()
{
  var socket = this.socket;

  socket.broadcast('typing', {
    username: socket.username
  });
}

function onStopTyping()
{
  var socket = this.socket;

  socket.broadcast('stop typing', {
    username: socket.username
  });
}

function onDisconnect()
{
  var Chat = this.nsp;
  var socket = this.socket;

  if (socket.addedUser)
  {
    --Chat.numUsers;

    // echo globally that this client has left
    socket.broadcast('user left', {
      username: socket.username,
      numUsers: Chat.numUsers
    });
  }
}

