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
    console.log("---------------| Simple Seiral Example |-----------------");
    console.log("");
    console.log("Server is on port 3000");
});


var portNameChoice = ["/dev/cu.usbmodem1411", "/dev/cu.usbmodem1421"];
portName = null;

SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {

    for(i=0; i < portNameChoice.length ;i++){

      if(portNameChoice[i] == port.comName){
        portName = port.comName;

      }

    }

	});

if(portName != null){

	console.log(portName);

	var port = new SerialPort(portName, {
	  baudRate: 9600,
	  parser: SerialPort.parsers.readline("\n"),
	});


	port.on('open', function() {
		console.log("opened");

		setTimeout(function(){
			port.write("hi");//hi
			console.log("say Hi");
		},2000);	

	});

	var serialData = null;

	port.on( 'data', function(data){
			console.log(data.toString());
			serialData = data.toString();

			if(mySocket != undefined){
				mySocket.emit("serialData",serialData);
			}

		port.write(0);			
	});

}

});

//-----------------Socket.io----------------//

var mySocket = null;

io.on('connection', function(socket){

	mySocket = socket;

});



