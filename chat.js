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

  // or alternatively, setup route individually
  this.reg('ping', function()
  {
    this.emit('pong');
  });
});

module.exports = chat;
