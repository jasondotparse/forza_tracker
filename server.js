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
  if (raceIsOn) {

    const rpmMax = message.slice(8, 12).readFloatLE(0);
    const rpmIdle = message.slice(12, 16).readFloatLE(0);
    const rpmCurrent = message.slice(16, 20).readFloatLE(0);

    console.log(rpmCurrent, rpmIdle, rpmMax);

  }
});

server.bind(PORT, HOST);