<template>
  <div>
    <div>rpm: {{ displayedRPM }}</div>
    <div>rpmMax: {{ displayedMaxRPM }}</div>
    <div>rpmIdle: {{ displayedMinRPM }}</div>
  </div>
</template>

<script>
export default {
  props: [ 'rpmCurrent', 'rpmMax', 'rpmIdle' ],
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
    }
  }
};
</script>
