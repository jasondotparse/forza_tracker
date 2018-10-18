const PORT = 4200;
const HOST = "10.0.0.118";
const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "js")));

const data = {
  rpmCurrent,
  rpmIdle,
  rpmMax
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

server.on("message", function(message, remote) {
  const raceIsOn = message.slice(0, 4).readInt8(0);
  if (raceIsOn) {

    data.rpmMax = message.slice(8, 12).readFloatLE(0);
    data.rpmIdle = message.slice(12, 16).readFloatLE(0);
    data.rpmCurrent = message.slice(16, 20).readFloatLE(0);

    // console.log(rpmCurrent, rpmIdle, rpmMax);
  }
});

server.bind(PORT, HOST);
