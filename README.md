# Simple-Serialport
Simple serialport for Arduino based projects.


##Usage
```
$ cd .../Simple-Serialport

//Change to the working directory

$ npm install

//This will install all package you need to run the code.

$ node simpleSerial.js

//Run the code
```
##Update

Now support multiple data exchange. Quick look here:

You can send array from the node.js code. In the example, the serial runs a buadrate of 9600 bps, support up to 6 ~ 7 intiger data in an array, if you want to send more data in an array, you can increase the baudrate higher. With the highest baudrate supported by regular Arduino(like UNO), 115200 bps, 15 ~ 18 intigers can be send in an array appropriately.

<img src = "https://github.com/Rubinhuang9239/Simple-Serialport/blob/master/array.png">

<img width="240" src = "https://github.com/Rubinhuang9239/Simple-Serialport/blob/master/screenshot.png">

