var express = require('express');
var app = express();
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('App listening at http://%s:%s', host, port);

});
var io = require('socket.io')(server);
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var serialPort = new SerialPort("/dev/cu.usbserial-A602TPWW");


app.use("/", express.static(__dirname));

app.get('/', function (req, res) {
  res.render('index.html')
});

serialPort.on('open', function(){

  console.log('Serial Port Opend');

  var lastValue;
  io.sockets.on('connection', function (socket) {
      

      console.log('Socket connected');
      socket.emit('connected');
      var lastValue;

      serialPort.on('data', function(data){
          if(lastValue !== data.toString()){
          	if(data.toString()[0] == '1'){
              socket.emit('news', "street light is faulty");
              console.log(data.toString());
          }
          else if(data.toString()[0] == '0'){
          	socket.emit('news', "HELLO");
              console.log(data.toString());
          }
          else{
          	socket.emit('news', "blank");
              console.log(data.toString());
          }
          }
          lastValue = data.toString();
      });
  });
});