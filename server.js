const PORT = 4200;
const HOST = "10.0.1.57";
const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "js")));

const data = {

}

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});

app.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get(`/dist/build.js`, (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/build.js"));
});

app.get(`/data`, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(data));
});

server.on("listening", function() {
  let address = server.address();
  console.log(
    "UDP Server listening on " + address.address + ":" + address.port
  );
});

// make sure data out is on, IP address matches that above, and data output type is 'dash'.
server.on("message", function(message, remote) {
  const raceIsOn = message.slice(0, 4).readUInt16LE(0); // s32
  if (raceIsOn) {

    data.rpmMax = message.slice(8, 12).readFloatLE(0); // f32
    data.rpmIdle = message.slice(12, 16).readFloatLE(0); // f32
    data.rpmCurrent = message.slice(16, 20).readFloatLE(0); // f32

    data.carOrdinal = message.slice(212, 216).readUInt16LE(0); // s32
    data.carClass = message.slice(216, 220).readUInt16LE(0); // s32
    data.carPerformanceIndex = message.slice(220, 224).readUInt16LE(0); // s32
    data.drivetrainType = message.slice(224, 228).readUInt16LE(0); // s32
    data.numCylinders = message.slice(228, 232).readUInt16LE(0); // s32

    data.speedMPH = message.slice(244, 248).readFloatLE(0) * 2.23; // f32

    data.raceBestLap = message.slice(284, 288).readFloatLE(0); // f32
    data.raceCurrentLap = message.slice(292, 296).readFloatLE(0); // f32

    console.log('packet received');
  }
});

server.bind(PORT, HOST);
