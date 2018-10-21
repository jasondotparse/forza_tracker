const buildDataObj = packet => {

  const data = {};

  data.rpmMax = packet.slice(8, 12).readFloatLE(0); // f32
  data.rpmIdle = packet.slice(12, 16).readFloatLE(0); // f32
  data.rpmCurrent = packet.slice(16, 20).readFloatLE(0); // f32

  data.carOrdinal = packet.slice(212, 216).readUInt16LE(0); // s32
  data.carClass = packet.slice(216, 220).readUInt16LE(0); // s32
  data.carPerformanceIndex = packet.slice(220, 224).readUInt16LE(0); // s32
  data.drivetrainType = packet.slice(224, 228).readUInt16LE(0); // s32
  data.numCylinders = packet.slice(228, 232).readUInt16LE(0); // s32

  data.speedMPH = packet.slice(244, 248).readFloatLE(0) * 2.23; // f32

  data.raceBestLap = packet.slice(284, 288).readFloatLE(0); // f32
  data.lastLap = packet.slice(288,292).readFloatLE(0) // f32
  data.raceCurrentLap = packet.slice(292, 296).readFloatLE(0); // f32

  return data;
}

module.exports = {
  buildDataObj
}