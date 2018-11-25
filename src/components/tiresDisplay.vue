<template>
  <div id="container">
    <img :src="require('../assets/overheadCar.png')" width="400" height="225" id="overheadCarImg"/>
    <div id="tiresOverlay"></div>
  </div>
</template>

<style>
  #container {
    position: relative;
  }
  #overheadCarImg {
      -webkit-transform: rotate(270deg);
      -moz-transform: rotate(270deg);
      -o-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      transform: rotate(270deg);
      padding-right: 100px;
      opacity: .5;
  }
  #tiresOverlay {
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 130px;
    padding-top: 50px;
  }
</style>

<script>
import * as d3 from 'd3';

export default {
  props: ['tireFrictionFL', 'tireFrictionFR', 'tireFrictionBL', 'tireFrictionBR'],
  data() {
    return {
      
    };
  },
  computed: {
    frictionFL: function () {
      return this.tireFrictionFL;
    },
    frictionFR: function () {
      return this.tireFrictionFR;
    },
    frictionBL: function () {
      return this.tireFrictionBL;
    },
    frictionBR: function () {
      return this.tireFrictionBR;
    },
  },
  mounted: function() {
    this.svgContainer = d3.select("#tiresOverlay").append("svg").attr("width", 200).attr("height", 300);

    this.frontLeft = this.svgContainer.append("rect").attr("x", 0).attr("y", 0).attr("z", 10).attr("width", 30).attr("height", 60).style("fill", function(d) { return 'black' });
    this.frontRight = this.svgContainer.append("rect").attr("x", 110).attr("y", 0).attr("z", 10).attr("width", 30).attr("height", 60).style("fill", function(d) { return 'black' });
    this.backLeft = this.svgContainer.append("rect").attr("x", 0).attr("y", 175).attr("z", 10).attr("width", 30).attr("height", 60).style("fill", function(d) { return 'black' });
    this.backRight = this.svgContainer.append("rect").attr("x", 110).attr("y", 175).attr("z", 10).attr("width", 30).attr("height", 60).style("fill", function(d) { return 'black' });
  }
};
</script>
