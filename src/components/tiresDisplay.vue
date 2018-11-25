<template>
  <div>
    <div class="row" id="tireFrictionVisual"></div>
    <img :src="require('../assets/overheadCar.png')" width="100" height="100"/>
  </div>
</template>

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
    // this.svgContainer = d3.select("#tireFrictionVisual").append("svg").attr("width", 400).attr("height", 400);

    // this.carVisual = this.svgContainer.append("rect").attr("x", 50).attr("y", 50).attr("z", 0).attr("width", 150).attr("height", 300).style("fill", function(d) { return 'black' });
  }
};
</script>
