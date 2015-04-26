var jfive = require( 'johnny-five' );
var board = new jfive.Board();
var express = require('express');
var connection  = require('express-myconnection');
var mysql = require('mysql');
var app = express();
var http = require('http').Server(app);
var socketio = require('socket.io')(http);
var socketg;
var results;

// declare button pins on Arduino
var allBtnPin = 2;
var devBtnPin = 4;
var desBtnPin = 6;

var led3;
var led5;
var led7;


// ------------------------------------
// Route to public files
// ------------------------------------
app.use('/assets/', express.static(__dirname + '/public/assets/'));

// ------------------------------------
// Set MySQL Connection
// ------------------------------------
// app.use(

//     connection(mysql, {
//         host     : 'localhost',
//         user     : 'specialU',
//         password : '5p3c1alP',
//         database : 'special',
//         insecureAuth: true,
//         debug    : false 
//     },'request')

// );

// ------------------------------------
// Route to index page
// ------------------------------------
app.get('/',function(req,res){

    res.sendFile(__dirname + '/public/index.html');
});

// ------------------------------------
// Start server
// ------------------------------------
http.listen( process.env.PORT || 2000, process.env.IP || "0.0.0.0", function() {

	var addr = http.address();
	console.log("Server started at", addr.address + ":" + addr.port);
});



// ------------------------------------
// Declare socket
// ------------------------------------
socketio.on('connection', function(socket) {
	socketg = socket;

	socketg.on('stopBlinking', function(data){

	    console.log(data);

	    led3.stop().on();
		led5.stop().on();
		led7.stop().on();

	});
});

console.log('pre board');

// ------------------------------------
// Arduino Board commands here
// ------------------------------------ 
board.on('ready', function(){
	var allBtn = new jfive.Button(allBtnPin);
	var devBtn = new jfive.Button(devBtnPin);
	var desBtn = new jfive.Button(desBtnPin);

	console.log('board ready');

	led3 = new jfive.Led(3);
	led3.on();

	led5 = new jfive.Led(5);
	led5.on();

	led7 = new jfive.Led(7);
	led7.on();


	allBtn.on('press', function(){

		console.log('all button pressed');

		led5.stop().on();
		led7.stop().on();
		led3.blink(300);

		showAll();
	});

	devBtn.on('press', function(){

		console.log('dev button pressed');

		led3.stop().on();
		led7.stop().on();
		led5.blink(300);

		showDev();
	});

	desBtn.on('press', function(){

		console.log('des button pressed');

		led3.stop().on();
		led5.stop().on();
		led7.blink(300);

		showDes();

	});

	// allBtn.on('release', function(){
	// 	led3.off();
	// });

	// desBtn.on('release', function(){
	// 	led5.off();
	// });

	// devBtn.on('release', function(){
	// 	led7.off();
	// });
});

// ------------------------------------
// Button Click functions from Arduino
// ------------------------------------
function showAll() {

	results = {results: 'show all'};

	socketg.emit('showAll', results);

}

function showDev() {

	results = {results: 'show developers'};

	socketg.emit('showDev', results);

}

function showDes() {

	results = {results: 'show designers'};

	socketg.emit('showDes', results);

}