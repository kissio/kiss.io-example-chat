'use strict';

var io      = require('kiss.io');

var router  = require('./router');
var chat    = io.Namespace('/chat');


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

/*!
 * Export Chat
 */
module.exports = chat;
