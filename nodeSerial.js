var SerialPort = require("serialport");
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

//----------------Route--------------------//

app.use(express.static('public'));

http.listen(3000, function(){
  	console.log("");
    console.log("");
    console.log("---------------|  Roomba Testing  |-----------------");
    console.log("");
    console.log("Server is on port 3000");
});


// console.log(serial);
var port = new SerialPort("/dev/cu.usbmodem1411", {
  baudRate: 9600,
  parser: SerialPort.parsers.readline("\n"),
});


port.on('open', function() {
	console.log("opened");
});

var lastSerialData = null;

port.on( 'data', function(data){
		//console.log(data.toString());
		lastSerialData = data.toString();
		if(mySocket != undefined){
			mySocket.emit("serialData",lastSerialData);
		}
});

//-----------------Socket.io----------------//

var mySocket = null;

io.on('connection', function(socket){

	mySocket = socket;

});



