'use strict';

var io      = require('kiss.io');

var Chat    = new io.Namespace('/chat');
var router  = require('./chat.router');


Chat.configure(function setLocals()
{
  this.numUsers = 0;
});

Chat.configure(function registerEvents()
{
  // init routers with Router
  this.use(router);

  // or alternatively, setup route individually
  this.reg('ping', function()
  {
    this.emit('pong');
  });
});

/*!
 * Export Chat
 */
module.exports = Chat;
