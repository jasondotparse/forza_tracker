<template>
  <div>
    <div>{{carName}} {{displayedCarClass}}/{{carPerformanceIndex}}</div>
    <div>{{numCylinders}} cylinder {{displayedDrivetrain}}</div>
    <div>lap: </div>
    <div>best lap: </div>
    <div>last lap: </div>
  </div>
</template>

<script>
export default {
  props: ['carOrdinal', 'carClass', 'carPerformanceIndex', 'drivetrainType', 'numCylinders'],
  data() {
    return {
      
    }
  },
  computed: {
    carName: function() {
      const carMap = {
        '2164': 'Lamborghini Hurican'
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
