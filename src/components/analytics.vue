<template>
  <div id="TelemetryView">
    <h1>Race Analytics</h1>
    <p>Click a lap number to see analytics gathered and tuning suggestions.</p>

    <div class="row">
      <div class="col-sm">
        <table class="table table-striped" id="col1">
        <thead class="thead-dark">
          <tr>
            <th scope="col">lap</th>
            <th scope="col">time</th>
            <th scope="col">data points</th>
            <th scope="col">avg RPMs</th>
            <th scope="col">avg speed</th>
            <th scope="col">avg tire load %, FL</th>
            <th scope="col">avg tire load %, FR</th>
            <th scope="col">avg tire load %, BL</th>
            <th scope="col">avg tire load %, BR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in lapData" :key="value.id" v-on:click="rowClicked(key)">
            <th scope="row">{{value.currentLapName}}</th>
            <td>{{ value.lapTime.toFixed(3) }}</td>
            <td>{{ value.dataPointsCount }}</td>
            <td>{{ value.averageRPMs.toFixed(0) }}</td>
            <td>{{ value.averageSpeed.toFixed(2) }}</td>
            <td>{{ value.averageFrictionFL.toFixed(2) }}</td>
            <td>{{ value.averageFrictionFR.toFixed(2) }}</td>
            <td>{{ value.averageFrictionBL.toFixed(2) }}</td>
            <td>{{ value.averageFrictionBR.toFixed(2) }}</td>
          </tr>
        </tbody>
        </table>
      </div>
      <div class="col-sm" id="histogram">
        <h3>% Time spent in each gear</h3>
        <div>{{histogramLap}}</div>
        <div id="histogramSVG"></div>
      </div>
    </div>
  
  <a href='/#/'>Back to dashboard</a>
  </div>
</template>

<style>

table {
  font-size: 12px;
  padding: 10px;
  table-layout: fixed;
}

#TelemetryView {
  margin: 25px;
}

</style>

<script>

import { serverBus } from '../main.js';
import Vue from "vue";
import { router } from '../main.js';
import * as d3 from 'd3';

export default {
  props: [],
  data() {
    return {
      allAnalyticsData: {},
      lapData: {},
      histogramLap: 'currentLapData'
    };
  },
  computed: {

  },
  methods: {
    rowClicked: function(row){
      this.histogramLap = row;
      console.log(this.allAnalyticsData[this.histogramLap]);
    }
  },
  created() {
    serverBus.$on('updateAnalytics', (server) => {
      this.allAnalyticsData = server;

      for (const key in this.allAnalyticsData) {
        if (key.includes('lap') || key === 'currentLapData') {

          if (key === 'currentLapData') {
            this.allAnalyticsData[key].currentLapName = 'current';
          } else {
            this.allAnalyticsData[key].currentLapName = key[key.length - 1];
          }

          Vue.set(this.lapData, key, this.allAnalyticsData[key])
        }
      }

    });

    window.setTimeout(() => {
      if (Object.keys(this.lapData).length === 0) {
        router.push('/')
      }
    }, 500)
  },
  watch: {
    allAnalyticsData: function(newVal, oldVal) {
      // this.gear1SVG.attr("height", (newVal[this.histogramLap].gear1Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
      // this.gear2SVG.attr("height", (newVal[this.histogramLap].gear2Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
      // this.gear3SVG.attr("height", (newVal[this.histogramLap].gear3Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
      // this.gear4SVG.attr("height", (newVal[this.histogramLap].gear4Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
      // this.gear5SVG.attr("height", (newVal[this.histogramLap].gear5Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
      // this.gear6SVG.attr("height", (newVal[this.histogramLap].gear6Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
      // this.gear7SVG.attr("height", (newVal[this.histogramLap].gear7Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
      // this.gear8SVG.attr("height", (newVal[this.histogramLap].gear8Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
    }
  },
  mounted: function() {
    this.svgContainer = d3.select("#histogramSVG"); // .append("svg")// .attr("width", 200).attr("height", 200);

    // var scale = d3.scaleLinear()
    //   .domain([d3.min(0), d3.max(200)])
    //   .range([0, 200]);

    // var x_axis = d3.axisBottom().scale(scale);

    // var y_axis = d3.axisLeft().scale(scale);

    // this.svgContainer.append("g")
    //    .call(x_axis)

    // this.svgContainer.append("g")
    //   .attr("transform", "translate(0, 0)")
    //   .call(y_axis);

    var width = 400, height = 400;

    var data = [10, 15, 20, 25, 30];

    var svg = d3.select("#histogramSVG")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var xscale = d3.scaleLinear()
        .domain([0, 8])
        .range([0, width - 100]);

    var yscale = d3.scaleLinear()
            .domain([0, 100])
            .range([height/2, 0]);

    var x_axis = d3.axisBottom()
            .scale(xscale);

    var y_axis = d3.axisLeft()
            .scale(yscale);

    svg.append("g")
      .attr("transform", "translate(25, 10)")
      .call(y_axis);

    var xAxisTranslate = height/2 + 10;

    svg.append("g")
      .attr("transform", "translate(25, " + xAxisTranslate  +")")
      .call(x_axis)

    this.gear1SVG = svg.append("rect").attr("x", 50).attr("y", 175).attr("z", 10).attr("height", 100).attr("width", 25).style("fill", function(d) { return 'steelblue' });
    // this.gear2SVG = this.svgContainer.append("rect").attr("x", 25).attr("y", 0).attr("z", 10).attr("width", 25).style("fill", function(d) { return '#808080' });
    // this.gear3SVG = this.svgContainer.append("rect").attr("x", 50).attr("y", 0).attr("z", 10).attr("width", 25).style("fill", function(d) { return '#808080' });
    // this.gear4SVG = this.svgContainer.append("rect").attr("x", 75).attr("y", 0).attr("z", 10).attr("width", 25).style("fill", function(d) { return '#808080' });
    // this.gear5SVG = this.svgContainer.append("rect").attr("x", 100).attr("y", 0).attr("z", 10).attr("width", 25).style("fill", function(d) { return '#808080' });
    // this.gear6SVG = this.svgContainer.append("rect").attr("x", 125).attr("y", 0).attr("z", 10).attr("width", 25).style("fill", function(d) { return '#808080' });
    // this.gear7SVG = this.svgContainer.append("rect").attr("x", 150).attr("y", 0).attr("z", 10).attr("width", 25).style("fill", function(d) { return '#808080' });
    // this.gear8SVG = this.svgContainer.append("rect").attr("x", 175).attr("y", 0).attr("z", 10).attr("width", 25).style("fill", function(d) { return '#808080' });
  }
};
</script>
