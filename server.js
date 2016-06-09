#!/usr/bin/env node
'use strict';

var express = require('express')
  , app     = express();
var kiss    = require('kiss.io'),
    io      = kiss();

var main    = io.namespace('/');
var router  = require('./router');


//!
// ----------- CHAT -------------
//
main.configure(function setLocals()
{
  this.numUsers = 0;
});

main.configure(function registerEvents()
{
  this.use(router);
});

main.on('connection', function(socket)
{
  console.log('hello %s', socket.id);
});

main.on('disconnection', function(socket)
{
  console.log('bye bye %s', socket.id);
});


//!
// --------- EXPRESS APP ---------
//
app.use(express.static(__dirname + '/public'));


//!
// --------- KISS.IO SERVER -------
//
io
.attach(app)
.listen(3000, function()
{
  console.log('Server listening at port 3000');
});
