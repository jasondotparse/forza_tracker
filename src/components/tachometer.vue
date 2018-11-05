<template>
  <div>
    <div>rpm: {{ displayedRPM }}</div>
    <div>rpmMax: {{ displayedMaxRPM }}</div>
    <div>rpmIdle: {{ displayedMinRPM }}</div>
    <div>power: {{ displayedPower }}</div>
    <div>torque: {{ torque }}</div>
    <div>gear: {{ gear }}</div>
  </div>
</template>

<script>
export default {
  props: [ 'rpmCurrent', 'rpmMax', 'rpmIdle', 'power', 'torque', 'gear'],
  data() {
    return {
      
    }
  },
  computed: {
    displayedRPM: function() {
      return Math.round(Number(this.rpmCurrent));
    },
    displayedMaxRPM: function() {
      return Math.round(Number(this.rpmMax));
    },
    displayedMinRPM: function() {
      return Math.round(Number(this.rpmIdle));
    },
    displayedPower: function() {
      return Number(this.power) / 745.7;
    }
  }
};
</script>
