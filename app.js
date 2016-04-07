var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('App listening at http://%s:%s', host, port);

});
var io = require('socket.io')(server);
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var serialPort = new SerialPort("/dev/cu.usbserial-A602TPWW",{
   baudRate: 9600,
   parser: serialport.parsers.readline("\n")
 });


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
        //console.log(data.toString());
        var jsonData = JSON.parse(data.toString());//kormaangala mgRoad bellandur rv
          if(lastValue !== data.toString()){
          	if(jsonData["bulb_1"] === "ON" && jsonData["bulb_2"] === "ON" && jsonData["bulb_3"] === "ON" && jsonData["bulb_4"] === "ON"){
              socket.emit('news', '{"bulb":[],"msg":"NONE OFF"}');
              console.log(data.toString());
          }
          else if(jsonData["bulb_1"] === "OFF" && jsonData["bulb_2"] === "ON" && jsonData["bulb_3"] === "ON" && jsonData["bulb_4"] === "ON"){
          	socket.emit('news', '{"bulb":[{"lat":12.9279, "lng":77.6271}],"msg":"LIGHT 1 OFF"}');
              console.log(data.toString());
          }
          else if(jsonData["bulb_1"] === "ON" && jsonData["bulb_2"] === "OFF" && jsonData["bulb_3"] === "ON" && jsonData["bulb_4"] === "ON"){
            socket.emit('news', '{"bulb":[{"lat": 12.9766, "lng": 77.5993}],"msg":"LIGHT 2 OFF"}');
              console.log(data.toString());
          }
          else if(jsonData["bulb_1"] === "OFF" && jsonData["bulb_2"] === "OFF" && jsonData["bulb_3"] === "ON" && jsonData["bulb_4"] === "ON"){
            socket.emit('news', '{"bulb":[{"lat":12.9279, "lng":77.6271},{"lat": 12.9766, "lng": 77.5993}],"msg":"Light 1,2 OFF"}');
              console.log(data.toString());
          }
          else if(jsonData["bulb_1"] === "ON" && jsonData["bulb_2"] === "ON" && jsonData["bulb_3"] === "OFF" && jsonData["bulb_4"] === "ON"){
            socket.emit('news', '{"bulb":[{"lat":12.9221, "lng":77.4976}],"msg":"Light 3 OFF"}');
              console.log(data.toString());
          }
          else if(jsonData["bulb_1"] === "OFF" && jsonData["bulb_2"] === "ON" && jsonData["bulb_3"] === "OFF" && jsonData["bulb_4"] === "ON"){
            socket.emit('news', '{"bulb":[{"lat":12.9279, "lng":77.6271},{"lat":12.9221, "lng":77.4976}],"msg":"Light 1,3 OFF"}');
              console.log(data.toString());
          }
          else if(jsonData["bulb_1"] === "ON" && jsonData["bulb_2"] === "OFF" && jsonData["bulb_3"] === "OFF" && jsonData["bulb_4"] === "ON"){
            socket.emit('news', '{"bulb":[{"lat": 12.9766, "lng": 77.5993},{"lat":12.9221, "lng":77.4976}],"msg":"Light 2,3 OFF"}');
              console.log(data.toString());
          }
          else if(jsonData["bulb_1"] === "OFF" && jsonData["bulb_2"] === "OFF" && jsonData["bulb_3"] === "OFF" && jsonData["bulb_4"] === "ON"){
            socket.emit('news', '{"bulb":[{"lat":12.9279, "lng":77.6271},{"lat": 12.9766, "lng": 77.5993},{"lat":12.9221, "lng":77.4976}],"msg":"Light 1,2,3 OFF"}');
              console.log(data.toString());
          }
          else if(jsonData["bulb_1"] === "ON" && jsonData["bulb_2"] === "ON" && jsonData["bulb_3"] === "ON" && jsonData["bulb_4"] === "OFF"){
            socket.emit('news', '{"bulb":[{"lat":12.9105, "lng":77.5857}],"msg":"Light 4 OFF"}');
              console.log(data.toString());
          }
          else if(jsonData["bulb_1"] === "OFF" && jsonData["bulb_2"] === "ON" && jsonData["bulb_3"] === "ON" && jsonData["bulb_4"] === "OFF"){
            socket.emit('news', '{"bulb":[{"lat":12.9279, "lng":77.6271},{"lat":12.9105, "lng":77.5857}],"msg":"Light 1,4 OFF"}');
              console.log(data.toString());
          }
          else if(jsonData["bulb_1"] === "ON" && jsonData["bulb_2"] === "OFF" && jsonData["bulb_3"] === "ON" && jsonData["bulb_4"] === "OFF"){
            socket.emit('news', '{"bulb":[{"lat": 12.9766, "lng": 77.5993},{"lat":12.9105, "lng":77.5857}],"msg":"Light 2,4 OFF"}');
              console.log(data.toString());
          }
          else if(jsonData["bulb_1"] === "OFF" && jsonData["bulb_2"] === "OFF" && jsonData["bulb_3"] === "ON" && jsonData["bulb_4"] === "OFF"){
            socket.emit('news', '{"bulb":[{"lat":12.9279, "lng":77.6271},{"lat": 12.9766, "lng": 77.5993},{"lat":12.9105, "lng":77.5857}],"msg":"Light 1,2,4 OFF"}');
              console.log(data.toString());
          }
          else if(jsonData["bulb_1"] === "ON" && jsonData["bulb_2"] === "ON" && jsonData["bulb_3"] === "OFF" && jsonData["bulb_4"] === "OFF"){
            socket.emit('news', '{"bulb":[{"lat":12.9221, "lng":77.4976},{"lat":12.9105, "lng":77.5857}],"msg":"Light 3,4 OFF"}');
              console.log(data.toString());
          }
          else if(jsonData["bulb_1"] === "OFF" && jsonData["bulb_2"] === "ON" && jsonData["bulb_3"] === "OFF" && jsonData["bulb_4"] === "OFF"){
            socket.emit('news', '{"bulb":[{"lat":12.9279, "lng":77.6271},{"lat":12.9221, "lng":77.4976},{"lat":12.9105, "lng":77.5857}],"msg":"Light 1,3,4 OFF"}');
              console.log(data.toString());
          }
          else if(jsonData["bulb_1"] === "ON" && jsonData["bulb_2"] === "OFF" && jsonData["bulb_3"] === "OFF" && jsonData["bulb_4"] === "OFF"){
            socket.emit('news', '{"bulb":[{"lat": 12.9766, "lng": 77.5993},{"lat":12.9221, "lng":77.4976},{"lat":12.9105, "lng":77.5857}],"msg":"Light 2,3,4 OFF"}');
              console.log(data.toString());
          }
          else{
            socket.emit('news', '{"bulb":[{"lat":12.9279, "lng":77.6271},{"lat": 12.9766, "lng": 77.5993},{"lat":12.9221, "lng":77.4976},{"lat":12.9105, "lng":77.5857}],"msg":"All OFF"}');
              console.log(data.toString());
          }
          }
          lastValue = data.toString();
      });
  });
});