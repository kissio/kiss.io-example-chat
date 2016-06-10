'use strict';

var kiss = require('kiss.io');
var router = kiss.Router();

var handlers = require('./handlers');

/*!
 * io.Router demonstration
 *
 * you can see here different styles of registering
 * ..a route to the route.
 *
 *
 * NOTE ABOUT Router.expect:
 *
 * Router.expect is an helper method that is used only to
 * ..provide more documentation to the router.
 * It is optional, and makes no changes to the real handler
 * ..when used. Use it to specify expected params.
 */
// when the client emits 'add user', this listens and executes
router
  .on('add user')
  .expects(['username'])
  .do(handlers.onLogin);

// when the client emits 'new message', this listens and executes
router
  .on('new message', handlers.onNewMessage);

// when the client emits 'typing', we broadcast it to others
router
  .on('typing', handlers.onTyping);

// when the client emits 'stop typing', we broadcast it to others
router
  .event('stop typing', handlers.onStopTyping);

// when the user disconnects.. perform this
router
  .event('disconnect')
  .do(handlers.onDisconnect);


module.exports = router;