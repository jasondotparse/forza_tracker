const PORT = 4200;
const HOST = '10.0.1.114';
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const express = require('express');
const path = require('path');
const app = express();
const { buildDataObj, generateDummyData, updateAnalyticsObj } = require('./utils');
const timer = require('timers');
const _ = require('lodash');

app.use(express.static(path.join(__dirname, 'js')));

const devMode = false;
let data;
let analyticsObj = {
  dataPointsCount: 0,
  totalRPMs: 0,
  totalSpeed: 0,
  averageSpeed: 0,
  averageRPMs: 0,
  totalFrictionFL: 0,
  averageFrictionFL: 0,
  totalFrictionFR: 0,
  averageFrictionFR: 0,
  totalFrictionBL: 0,
  averageFrictionBL: 0,
  totalFrictionBR: 0,
  averageFrictionBR: 0
};

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
    // update the analytics using data in the packet.
    let dashboardData = buildDataObj(message);
    analyticsObj = updateAnalyticsObj(dashboardData, analyticsObj);
    // update the data object.
    data = { ...dashboardData, analytics: analyticsObj };
  }
});

if (devMode) {
  timer.setInterval(() => {

    // udpate analytics object with artificial data
    analyticsObj.dataPointsCount++;
    analyticsObj.totalRPMs += Math.random(0, 1) * 1000;
    analyticsObj.totalSpeed += Math.random(0, 1) * 50;
    analyticsObj.averageSpeed = 100;
    analyticsObj.averageRPMs = 4000;

    data = generateDummyData(analyticsObj);
  }, 50)
}

server.bind(PORT, HOST);
