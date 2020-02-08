<template>
  <div>
    <div>speed: {{ displayedSpeed }} mph</div>
    <div>power: {{ displayedPower }} HP</div>
    <div>torque: {{ displayedTorque }} Nm</div>
    <div>fuel: {{displayedFuel}}%</div>
    <a href='/#/analytics'>View race analytics</a>
  </div>
</template>

<script>

const formatDisplayNum = str => Math.round(Math.max(Number(str), 0));

export default {
  props: ['speedMPH', 'power', 'torque', 'fuel'],
  data() {
    return {
      
    };
  },
  computed: {
    displayedSpeed: function () {
      return formatDisplayNum(this.speedMPH);
    },
    displayedPower: function () {
      const powerInWatts = this.power;
      const powerInHP = this.power / 745.699872;

      return formatDisplayNum(powerInHP);
    },
    displayedTorque: function () {
      return formatDisplayNum(this.torque);
    },
    displayedFuel: function () {
      return Number(this.fuel).toPrecision(2);
    }
  }
};
</script>
