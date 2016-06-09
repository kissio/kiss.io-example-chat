'use strict';


var kiss    = require('kiss.io'),
    io      = kiss();
var router  = require('./router');
var chat    = kiss.Namespace('/chat');


chat.configure(function setLocals()
{
  this.numUsers = 0;
});

chat.configure(function registerEvents()
{
  // init routers with Router
  this.use(router);
});

chat.on('connection', function(socket)
{
  console.log('hello %s', socket.id);
});

chat.on('disconnection', function(socket)
{
  console.log('bye bye %s', socket.id);
});

module.exports = chat;
