var configuration = require('./src/configuration.js');
var log = require('./src/log.js');
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.configure(function() {
    app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
    app.use(express.methodOverride());
});
app.configure('development', function() {
    server.listen(configuration.serverPort);
});
app.configure('production', function() {
    server.listen(80);
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

