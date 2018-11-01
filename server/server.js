const PORT = 4200;
const HOST = '10.0.0.118';
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const express = require('express');
const path = require('path');
const app = express();
const { buildDataObj } = require('./utils');

app.use(express.static(path.join(__dirname, 'js')));

let data;

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});

app.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname.slice(0, -6) + '/index.html'));
});

app.get(`/dist/build.js`, (req, res) => {
  res.sendFile(path.join(__dirname.slice(0, -6) + '/dist/build.js'));
});

app.get(`/data`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (data) {
    res.send(JSON.stringify(data));
  } else {
    res.send('no data');
  }
});

server.on('listening', function() {
  let address = server.address();
  console.log(`UDP server is listening on ${address.address}:${address.port}`);
});

// make sure data out is on, IP address matches that above, and data output type is 'dash'.
server.on('message', (message, remote) => {
  const raceIsOn = message.slice(0, 4).readUInt16LE(0); // s32
  if (raceIsOn) {
    data = buildDataObj(message);
    console.log('packet recieved');
  }
});

server.bind(PORT, HOST);
