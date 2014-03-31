var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);

app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/scripts'));

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// start with shairport active...
var station = 'shairport';
var util = require('util'),
    exec = require('child_process').exec,
    child;
child=exec('scripts/./startshairport',    // command line argument directly in string
  function (error, stdout, stderr) {      // one easy function to capture data/errors
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});

io.sockets.on('connection', function (socket) {

  console.log('connection');

  // when the client emits 'getNextStation', this listens and executes
  socket.on('getNextStation', function () {
    console.log('getNextStation');
    if(station == 'shairport')
    {
      station='kexp';
    }
    else if(station == 'kexp')
    {
      station='npr';
    }
    else // shairport
    {
      station='shairport';
    }

    // start the new station...
    child = exec('scripts/./start' + station, // command line argument directly in string
      function (error, stdout, stderr) {      // one easy function to capture data/errors
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
    
    // Tell the client to update the displayed station
    io.sockets.emit('updatestation', station);
  });

  socket.on('getVolume', function () {
    console.log('getVolume');
    child = exec('scripts/./getvol', // command line argument directly in string
      function (error, stdout, stderr) {      // one easy function to capture data/errors
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        io.sockets.emit('updatevolume', stdout);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
  });

  socket.on('setVolume', function (volume) {
      child = exec('scripts/./setvol '+volume, // command line argument directly in string
      function (error, stdout, stderr) {      // one easy function to capture data/errors
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        io.sockets.emit('updatevolume', stdout);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });

  });

  // when the client emits 'getCurrentStation', replay with the value
  socket.on('getCurrentStation', function(){
    console.log('getCurrentStation:',station);
    // echo to client they've connected
    socket.emit('updatestation', station);
  });
});
