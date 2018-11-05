<template>
  <div>
    <div>{{carName}} {{displayedCarClass}}/{{carPerformanceIndex}}</div>
    <div>{{numCylinders}} cylinder {{displayedDrivetrain}}</div>
    <div>lap number: {{displayedLap}}</div>
    <div>lap: {{ currentLap }}</div>
    <div>best lap: {{ bestLap }}</div>
    <div>last lap: {{lastLap}}</div>
  </div>
</template>

<script>
export default {
  props: ['carOrdinal', 'carClass', 'carPerformanceIndex', 'drivetrainType', 'numCylinders', 'currentLap', 'bestLap', 'lastLap', 'lapNumber'],
  data() {
    return {
      
    }
  },
  computed: {
    displayedLap: function() {
      return this.currentLap + 1;
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
