var configuration = require('./src/configuration.js');
var log = require('./src/log.js');
var express = require('express');
var app = express();
var http = require('http');
var io = require('socket.io').listen(http.createServer(app));

app.configure(function() {
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
    app.listen(configuration.serverPort);
});
app.configure('production', function() {
    app.listen(80);
});

io.set('log level', 1);
io.enable('browser client etag');
io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);

io.sockets.on('connection', function (socket) {
    log('client connected');

    socket.on('best-practice', function(practice) {
        log('best-practice', practice);
    });

    socket.on('bad-practice', function(practice) {
        log('bad-practice', practice);
    });

    socket.on('disconnect', function() {
        log('disconnect');
    });
});

