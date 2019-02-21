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

const SerialPort = require("serialport");
const express = require('express');
const app = express();
const socketIO = require('socket.io')
const http = require('http');
const httpServer = http.Server(app);

//----------------Route--------------------//

const httpPort = 3000;
app.use(express.static('public'));
httpServer.listen( httpPort, function(){
  	console.log("");
    console.log("");
    console.log("---------------| Simple Seiral Example |-----------------");
    console.log("");
    console.log("Server is on port 3000");
});

//-----------------Socket.io----------------//

let mySocket = undefined;

const io = socketIO(httpServer);
io.on('connection', (socket) => {
	console.log(`connection: ${socket.id}`);
	mySocket = socket;
});

//----------------Serial--------------------//
const portNameChoice = ["/dev/tty.usbmodem146201"];
const baudRate = 9600;
const lineEnding = '\n';
let sendData = [0,0,0,0,0,0];

const searchPort = () =>{
	SerialPort.list( (err, ports) => {
		if(err){
			console.log(err);
			return;
		}
	
		let portName = undefined;
		ports.some( port => {
			for(const choice of portNameChoice){
				if(port.comName === choice){
					portName = port.comName;
					return true;
				}
			}
		});
	
		console.log( portName? `Initial connection to: ${portName}`: `No desired port founded.`)
	
		if(portName){
			setupSerialConnection(portName, baudRate, lineEnding);
		}
	});	
}

const setupSerialConnection = (inputPortName, inputBaudRate, inputLineEnding) =>{
	const myPort = new SerialPort(inputPortName, {baudRate:inputBaudRate});// open the port
	const parser = new SerialPort.parsers.Readline(inputLineEnding);	// make instance of Readline parser
	myPort.pipe(parser);													// pipe the serial stream to the parser

	// these are the definitions for the serial events:
	myPort.on('open', ()=>{showPortOpen(myPort)});    // called when the serial port opens
	myPort.on('close', showPortClose);  // called when the serial port closes
	myPort.on('error', showError);   // called when there's an error with the serial port
	parser.on('data', data=>{readSerialData(data,myPort)});  // called when there's new data incoming

}

const showPortOpen = (port) => {
	console.log('port open. Data rate: ' + port.baudRate);
	setTimeout(()=>{
		port.write(`${sendData.length},${sendData.toString()},`);
	},2000); // initial the handshake
}

const readSerialData = (data, port) => {
		console.log(`serial data ==> ${data}`);
		if(mySocket && mySocket.connected){
			mySocket.emit('serialData', data);
		}
		sendData = sendData.map(()=>{
				return Math.round(Math.random()*300);
		})
		port.write(
				`${sendData.length},${sendData.toString()},`
		);
}

const showPortClose = (portName) => {
	console.log(`Port closed: ${portName}`);
}

const showError = (error) => {
	console.log('Serial port error: ' + error);
}

// Kick off
searchPort();

