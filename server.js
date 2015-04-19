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
var desBtnPin = 7;


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
http.listen( process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {

	var addr = http.address();
	console.log("Server started at", addr.address + ":" + addr.port);
});



// ------------------------------------
// Declare socket
// ------------------------------------
socketio.on('connection', function(socket) {
	socketg = socket;
});

// ------------------------------------
// Arduino Board commands here
// ------------------------------------ 
board.on('ready', function(){
	var allBtn = new jfive.Button(allBtnPin);
	var devBtn = new jfive.Button(devBtnPin);
	var desBtn = new jfive.Button(desBtnPin);

	allBtn.on('hit', function(){
		
		showAll();
	}); 

	devBtn.on('hit', function(){
		
		showDev();
	});

	desBtn.on('hit', function(){
		
		showDes();
		
	});   

	// allBtn.on('release', function(){
	// 	led.off();
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