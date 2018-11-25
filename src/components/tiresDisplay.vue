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

const adjustTireColor = (load, element) => {
  if (load > 1) {
    element.style("fill", function(d) { return 'red' });
  } else if (load > .8 && load < 1) {
    element.style("fill", function(d) { return 'orange' });
  } else {
    element.style("fill", function(d) { return 'black' });
  }
}

export default {
  frontLeftSVG: null,
  frontRightSVG: null,
  backLeftSVG: null,
  backRightSVG: null,
  props: ['tireFrictionFL', 'tireFrictionFR', 'tireFrictionBL', 'tireFrictionBR'],
  data() {
    return {
      
    };
  },
  computed: {

  },
  watch: {
    tireFrictionFL: function() {
      adjustTireColor(this.tireFrictionFL, this.frontLeftSVG);
    },
    tireFrictionFR: function() {
      adjustTireColor(this.tireFrictionFR, this.frontRightSVG);
    },
    tireFrictionBL: function() {
      adjustTireColor(this.tireFrictionBL, this.backLeftSVG);
    },
    tireFrictionBR: function() {
      adjustTireColor(this.tireFrictionBR, this.backRightSVG);
    }
  },
  mounted: function() {
    this.svgContainer = d3.select("#tiresOverlay").append("svg").attr("width", 200).attr("height", 300);

    this.frontLeftSVG = this.svgContainer.append("rect").attr("x", 0).attr("y", 0).attr("z", 10).attr("width", 30).attr("height", 60).style("fill", function(d) { return 'black' });
    this.frontRightSVG = this.svgContainer.append("rect").attr("x", 110).attr("y", 0).attr("z", 10).attr("width", 30).attr("height", 60).style("fill", function(d) { return 'black' });
    this.backLeftSVG = this.svgContainer.append("rect").attr("x", 0).attr("y", 175).attr("z", 10).attr("width", 30).attr("height", 60).style("fill", function(d) { return 'black' });
    this.backRightSVG = this.svgContainer.append("rect").attr("x", 110).attr("y", 175).attr("z", 10).attr("width", 30).attr("height", 60).style("fill", function(d) { return 'black' });
  }
};
</script>
