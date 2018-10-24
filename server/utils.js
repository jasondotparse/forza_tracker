const buildDataObj = packet => {
  return {
    // telemetry data
    rpmMax: packet.slice(8, 12).readFloatLE(0), // f32
    rpmIdle: packet.slice(12, 16).readFloatLE(0), // f32
    rpmCurrent: packet.slice(16, 20).readFloatLE(0), // f32
    speedMPH: packet.slice(244, 248).readFloatLE(0) * 2.23, // f32

    // car stats
    carOrdinal: packet.slice(212, 216).readUInt16LE(0), // s32
    carClass: packet.slice(216, 220).readUInt16LE(0),// s32
    carPerformanceIndex: packet.slice(220, 224).readUInt16LE(0), // s32
    drivetrainType: packet.slice(224, 228).readUInt16LE(0), // s32
    numCylinders: packet.slice(228, 232).readUInt16LE(0), // s32
    
    // race stats
    raceBestLap: packet.slice(284, 288).readFloatLE(0), // f32
    lastLap: packet.slice(288,292).readFloatLE(0), // f32
    raceCurrentLap: packet.slice(292, 296).readFloatLE(0) // f32
  };
}

module.exports = {
  buildDataObj
}