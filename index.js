'use strict';

// Initialize the sensor
var Wfs = require('water-flow-sensor');
var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();
var pin_sensors = [17, 18];
var sensor_type = 'YF-S201';
var sensors = [];

var server = '192.168.1.63';
var port = '8080';

client.on('connectFailed', function(error) {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
  pin_sensors.forEach(function(element, index) {
    sensors[index] = new Wfs(element, sensor_type, wfsCb);
  });
  connection.on('error', function(error) {
    console.log('Connection Error: ' + error.toString());
  });
  connection.on('close', function() {
    console.log('echo-protocol Connection Closed');
  });
  function wfsCb(res) {
    if (connection.connected) {
      connection.send(JSON.stringify({
        id: res.pin,
        status: res.isRunning,
        volume: res.volume,
      }));
    }
  }
});

client.connect('ws://' + server + ':' + port + '/', 'jabalbrew-messages');
