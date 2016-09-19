#!/usr/bin/env node

var http = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.static(__dirname));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) { // named pipe
		return val;
	}

	if (port >= 0) { // port number
		return port;
	}

	return false;
}


function onError(error) {
	console.log(error);
}

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;

	console.log('Listening on ' + bind);
}

