var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http)
	five = require('johnny-five'),
	board = new five.Board();


app.use('/', express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

var led;

io.on('connection', function(socket) {
	board.on('ready', function() {
		led = new five.Led(13);
	});

	console.log("connected");
	socket.on('disconnect', function() {
		console.log('disconnected');
	});

	socket.on('led:on', function(err) {
		if (err) console.error(err);
		console.log('LED ON');
		led.on();
	});

	socket.on('led:off', function(err) {
		if (err) console.error(err);
		console.log('LED OFF');
		led.off();
	});
});

var port = 3000;
http.listen(port, function() {
	console.log('Listening on port: ' + port);
});