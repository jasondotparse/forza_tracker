<template>
  <div class="container">
    <div class="row">gear: {{ gear }}</div>
    <div class="row">{{ displayedRPM }}RPM</div>
    <div class="row" id="tachometerGuage"></div>
  </div>
</template>
<style>
  #tachometerGuage {
    height: 600px;
  }
</style>
<script>
import * as d3 from 'd3';
export default {
  svgContainer: null,
  tachometerGuage: null,
  maxRPMsGuage: null,
  currRPMsGuage: null,
  props: [ 'rpmCurrent', 'rpmMax', 'rpmIdle', 'gear'],
  data() {
    return {

    }
  },
  computed: {
    displayedRPM: function() {
      return Math.round(Number(this.rpmCurrent));
    }
  },
  watch: {
    rpmCurrent: function(newVal, oldVal) {
      const percentageOfMax = Number(newVal) / this.rpmMax;
      const height = percentageOfMax * 500;
      const Y = 500 - height;

      this.currRPMsGuage.attr("y", Y).attr("height", height);

      if (percentageOfMax > .75) {
        this.currRPMsGuage.style("fill", function(d) { return 'red' });
      } else {
        this.currRPMsGuage.style("fill", function(d) { return 'green' });
      }
    }
  },
  mounted: function() {
    this.svgContainer = d3.select("#tachometerGuage").append("svg").attr("width", 200).attr("height", 600);
    
    this.maxRPMsGuage = this.svgContainer.append("rect").attr("x", 10).attr("y", 0).attr("z", 20).attr("width", 70).attr("height", 500).style("fill", function(d) { return 'black' });
    this.currRPMsGuage = this.svgContainer.append("rect").attr("x", 10).attr("y", 0).attr("z", 30).attr("width", 70);
  }
};
</script>
