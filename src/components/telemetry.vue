<template>
  <div>
    <div>speed: {{ displayedSpeed }}mph</div>
    <div>power: {{ displayedPower }}mph</div>
    <div>torque: {{ displayedTorque }}mph</div>
  </div>
</template>

<script>
export default {
  props: ['speedMPH', 'power', 'torque'],
  data() {
    return {
      
    };
  },
  computed: {
    displayedSpeed: function () {
      return Math.round(Number(this.speedMPH));
    },
    displayedPower: function () {
      return Math.round(Number(this.power));
    },
    displayedTorque: function () {
      return Math.round(Number(this.torque));
    }
  }
};
</script>
