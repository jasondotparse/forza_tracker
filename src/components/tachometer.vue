<template>
  <div class="container">
    <div class="row">gear: {{ gear }}</div>
    <div class="row">{{ displayedRPM }}RPM</div>
    <div class="row" id="tachometerGuage"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  props: [ 'rpmCurrent', 'rpmMax', 'rpmIdle', 'gear'],
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
  },
  mounted: function() {
    const svgContainer = d3.select("#tachometerGuage").append("svg").attr("width", 200).attr("height", 500);

    const tachometer = svgContainer.append("rect").attr("x", 10).attr("y", 10).attr("width", 50).attr("height", 400);
    const maxRPMs = svgContainer.append("rect").attr("x", 10).attr("y", 10).attr("width", 75).attr("height", 300);
    const currRPMs = svgContainer.append("rect").attr("x", 10).attr("y", 10).attr("width", 80).attr("height", 200);
  }
};
</script>
