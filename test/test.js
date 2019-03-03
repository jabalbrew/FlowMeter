var expect = require('chai').expect;
var should = require('chai').should;
var WebSocketClient = require('websocket').client;
var WebSockerServer = require('websocket').server;
//var Wfs = require('water-flow-sensor');
var http = require('http');

var socketUrl = 'ws://localhost:8080';

describe('The application', function () {
    var client = new WebSocketClient();
    var wsServer;
    var server = http.createServer(function(request, response) {
        console.log((new Date()) + ' Received request for ' + request.url);
        response.writeHead(404);
        response.end();
    });
    var sensors = [];
    beforeEach(function(done) {
        // Setup
        client.connect(socketUrl, {
          'reconnection delay' : 0
          , 'reopen delay' : 0
          , 'force new connection' : true
          , transports: ['websocket']
        });
    
        client.on('connect', () => {
          console.log('disconnected...');
          done();
        });
    
        client.on('disconnect', () => {
          // console.log('disconnected...');
          done();
        });
        wsServer = new WebSockerServer({
            httpServer: server,
            autoAcceptConnections: false
        });
        wsServer.on('request', function(request) {
            var connection = request.accept('jabalbrew-messages', request.origin);
        });
        done();
    });
    afterEach((done) => {
        // Cleanup
        if(client.connected) {
          client.disconnect();
        }
        done();
    });
    
    it('should connect to the server', function(done){
        wsServer.on('connection', (socket) => {
            expect(socket).to.not.be.null;
        });
        done();
    })
    it('should create the functions for sensors array', function(done) {
        let pin_sensors = ['17', '18'];
        
        done();
    })
});