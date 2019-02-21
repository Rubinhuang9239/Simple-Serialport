# Simple-Serialport
A simple node.js serial port communication code for Arduino based projects to send back and forth multiple data, added hand shack.


## Usage
```Shell
# Change to the working directory
$ cd .../Simple-Serialport

# This will install all package you need to run the code.
$ npm install

# Run the code
$ npm start
```
## Update

Now support multiple data exchange. Quick look here:

You can send array from the node.js code. In the example, the serial runs a buadrate of 9600 bps, support up to 6 ~ 7 intiger data in an array, if you want to send more data in an array, you can increase the baudrate higher.

With the highest baudrate supported by regular Arduino(like UNO), 115200 bps, 15 ~ 18 intigers can be send in an array with decent spead.
(like 1,34,356,1034,...etc. I assume you dont need to send crazy big interger value)

<img src = "https://github.com/Rubinhuang9239/Simple-Serialport/blob/master/array.png">

<img width="240" src = "https://github.com/Rubinhuang9239/Simple-Serialport/blob/master/screenshot.png">

