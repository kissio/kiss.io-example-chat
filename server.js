#!/usr/bin/env node
'use strict';

var express = require('express')
  , app     = express();
var io      = require('kiss.io');

var chat    = require('./chat');

/*
 * Setup basic express server, serve web chat gui
 */
app.use(express.static(__dirname + '/public'));

/*
 * Start listening
 */
io()
.mount(chat)
.attach(app)
.listen(3000, function()
{
  console.log('Server listening at port 3000');
});
