/* jshint undef: false, esversion: 6 */
 
 
var main = function () {
  'use strict';
  
  const ws = require('./writestream-context-manager');
  const fs = require('fs');
  const net = require('net');
  
  
     
  ws.using(fs.createWriteStream('foobar.txt'), function(stream) {
        
    stream.on('close', function(err) {
      console.log('closing file');
    });
    throw new Error('Prevent writing');
    stream.write('foo');
    stream.write('bar');
  });
  
  
  var server = net.createServer(function (socket){
    socket.setNoDelay(true);
    
    socket.on('close', function(err) {
      console.log('closing server socket');
      server.close();
    });
    
    socket.on('data', function(data) {
      console.log(data.toString());
    });
  
  }).listen(4242, function () {
    ws.using(net.createConnection(4242), function(stream) {
      stream.on('close', function(err) {
        console.log('closing client socket');
      });
      stream.write('Hello context manager world!');
    });
  });
}();