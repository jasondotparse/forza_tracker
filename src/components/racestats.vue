<template>
  <div>
    <div>PI: {{carName}} {{displayedCarClass}}/{{carPerformanceIndex}}</div>
    <div>{{numCylinders}} cylinder {{displayedDrivetrain}}</div>
    <div>lap {{displayedLapNum}}</div>
    <div>current lap: {{ displayedCurrentLapTime }}</div>
    <div>best lap: {{ displayedBestLapTime }}</div>
    <div>last lap: {{ displayedLastLapTime }}</div>
  </div>
</template>

<script>
export default {
  props: [
    'carOrdinal', 
    'carClass', 
    'carPerformanceIndex', 
    'drivetrainType', 
    'numCylinders', 
    'currentLap', 
    'bestLap', 
    'lastLap', 
    'lapNumber'
  ],
  data() {
    return { }
  },
  computed: {
    displayedCurrentLapTime: function() {
      return Number(this.currentLap).toPrecision(6);
    },
    displayedBestLapTime: function() {
      return Number(this.bestLap).toPrecision(6);
    },
    displayedLastLapTime: function() {
      return Number(this.lastLap).toPrecision(6);
    },
    displayedLapNum: function() {
      return this.lapNumber + 1;
    }, 
    carName: function() {
      const carMap = {
        '2164': ' 2015 Lamborghini Hurican', 
        '3072': '2018 Porsche 911 GT3 RS'
      };

      return carMap[this.carOrdinal];
    },
    displayedCarClass: function() {
      const classMap = {
        '0': 'D',
        '1': 'E',
        '2': 'B',
        '3': 'C',
        '4': 'A',
        '5': 'S',
        '6': 'P',
        '7': 'X'
      };

      return classMap[this.carClass]
    },
    displayedDrivetrain: function() {
      const drivetrainMap = {
        '0': 'FWD',
        '1': 'RWD',
        '2': 'AWD'
      };

      return drivetrainMap[this.drivetrainType];
    }
  }
};
</script>
