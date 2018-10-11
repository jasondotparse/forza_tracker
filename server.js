const PORT = 4200;
const HOST = '10.0.0.118';

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

let udp = require('udp-packet')
let StringDecoder = require('string_decoder').StringDecoder;

server.on('listening', function () {
  let address = server.address();
  console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
  const raceIsOn = message.slice(0, 4).readInt8(0);
  let timestamp; // possibly could be readInt32LE(0);

  const rpmMax = message.slice(8, 12).readFloatLE(0);
  const rpmIdle = message.slice(12, 16).readFloatLE(0);
  const rpmCurrent = message.slice(16, 20).readFloatLE(0);

  const accelerationX = message.slice(20, 24).read(0);
  const accelerationY = message.slice(24, 28).readDoubleLE(0);
  const accelerationZ = message.slice(28, 32).readDoubleLE(0);

  const velocityX = message.slice(32, 36).readFloatLE(0);
  const velocityY = message.slice(36, 40).readFloatLE(0);
  const velocityZ = message.slice(40, 44).readFloatLE(0);

  console.log(rpmCurrent);
});

server.bind(PORT, HOST);