const buildDataObj = packet => {
  return {
    // telemetry data
    rpmMax: packet.slice(8, 12).readFloatLE(0), // f32
    rpmIdle: packet.slice(12, 16).readFloatLE(0), // f32
    rpmCurrent: packet.slice(16, 20).readFloatLE(0), // f32
    speedMPH: packet.slice(244, 248).readFloatLE(0) * 2.23, // f32
    power: packet.slice(248, 252).readFloatLE(0), // f32
    torque: packet.slice(252, 256).readFloatLE(0), // f32

    /* todo: find the correct data to get current gear */
    gear: packet.slice(307, 308).readInt8(0), // u8

    // tire friction
    tireFrictionFL: packet.slice(180,184).readFloatLE(0), // f32
    tireFrictionFR: packet.slice(184,188).readFloatLE(0), // f32
    tireFrictionBL: packet.slice(188,192).readFloatLE(0), // f32
    tireFrictionBR: packet.slice(192,196).readFloatLE(0), // f32

    // car stats
    carOrdinal: packet.slice(212, 216).readUInt16LE(0), // s32
    carClass: packet.slice(216, 220).readUInt16LE(0),// s32
    carPerformanceIndex: packet.slice(220, 224).readUInt16LE(0), // s32
    drivetrainType: packet.slice(224, 228).readUInt16LE(0), // s32
    numCylinders: packet.slice(228, 232).readUInt16LE(0), // s32
    
    // race stats
    raceBestLap: packet.slice(284, 288).readFloatLE(0), // f32
    lastLap: packet.slice(288,292).readFloatLE(0), // f32
    raceCurrentLap: packet.slice(292, 296).readFloatLE(0), // f32
    lapNumber: packet.slice(300, 302).readUInt16LE(0) // u16
  };
}

const generateDummyData = () => {
  return {
    rpmMax: Math.random(0, 1),
    rpmIdle: Math.random(0, 1),
    rpmCurrent: Math.random(0, 1),
    speedMPH: Math.random(0, 1),
    power: Math.random(0, 1),
    torque: Math.random(0, 1),
    gear: Math.random(0, 1),
    tireFrictionFL: Math.random(0, 1),
    tireFrictionFR: Math.random(0, 1),
    tireFrictionBL: Math.random(0, 1),
    tireFrictionBR: Math.random(0, 1),
    carOrdinal: Math.random(0, 1),
    carClass: Math.random(0, 1),
    carPerformanceIndex: Math.random(0, 1),
    drivetrainType: Math.random(0, 1),
    numCylinders: Math.random(0, 1),
    raceBestLap: Math.random(0, 1),
    lastLap: Math.random(0, 1),
    raceCurrentLap: Math.random(0, 1),
    lapNumber: Math.random(0, 1),
  }
}

module.exports = {
  buildDataObj, 
  generateDummyData
}