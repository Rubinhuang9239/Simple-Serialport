//	   _____ _                 __          _____           _       __
//	  / ___/(_)___ ___  ____  / /__       / ___/___  _____(_)___ _/ /
//	  \__ \/ / __ `__ \/ __ \/ / _ \______\__ \/ _ \/ ___/ / __ `/ / 
//	 ___/ / / / / / / / /_/ / /  __/_____/__/ /  __/ /  / / /_/ / /  
//	/____/_/_/ /_/ /_/ .___/_/\___/     /____/\___/_/  /_/\__,_/_/   
//	                /_/

//Simple Serial written by Rubin Huang at NYU|ITP.
//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
//to deal in the Software without restriction, including without limitation the rights to use, copy,
//modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
//and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
//INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
//IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
//WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var SerialPort = require("serialport");
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);

//----------------Route--------------------//

app.use(express.static('public'));

var httpPort = 3000;

http.listen( httpPort, function(){
  	console.log("");
    console.log("");
    console.log("---------------| Simple Seiral Example |-----------------");
    console.log("");
    console.log("Server is on port 3000");
});


var portNameChoice = ["/dev/cu.usbmodem1411", "/dev/cu.usbmodem1421", "/dev/cu.usbmodem1451", "/dev/cu.usbmodem1461"];
var portName = null;

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
			port.write("0");
			console.log("Hand shake say hi");
		},2000);	

	});

	var serialData = null;

	port.on( 'data', function(data){

			serialData = data.toString();

			process.stdout.clearLine();
		    process.stdout.cursorTo(0);
		    process.stdout.write('\x1b[33m'+"Serial Data>> "+serialData+'\x1b[0m');

			if(mySocket != undefined){
				mySocket.emit("serialData",serialData);
			}

		var sendingMSG = sendVal.length + ","; // sendVal is defined as an array, scroll a little bit down to see it.

		//-- Form the message for sending to the serial port --//
		for(var i = 0; i < sendVal.length; i++){


			//-- update the sendVal randomly --//

			sendVal[i] = Math.floor(Math.random()*400);

			//-- pack! --//
			if( (sendVal.length > 1) && (i < sendVal.length - 1) ){
				sendingMSG += sendVal[i] + ",";
			}
			else if( i == sendVal.length - 1 ){
				sendingMSG += sendVal[i];
			}

		}

		port.write( sendingMSG );

	});

}

});

//-----------------Demo_SendVal----------------//

var sendVal = [0,0,0,0];


//-----------------Socket.io----------------//

var io = require('socket.io')(http);

var mySocket = null;

io.on('connection', function(socket){

	mySocket = socket;

});



