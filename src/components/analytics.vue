<template>
  <div>
    <h1>race analytics</h1>
    <div>Click a lap number to see analytics gathered and tuning suggestions.</div>

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
            <th scope="row">{{key}}</th>
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
        <h3>Time spent in each gear</h3>
        <div>{{histogramLap}}</div>
        <div id="histogramSVG"></div>
      </div>
    </div>
  
  <a href='/#/'>Back to dashboard</a>
  </div>
</template>

<style>

.table {
  font-size: 12px;
  padding: 10px;
  width: 600px;
}

.row {
  margin-left: 10px;
}

#gear1Time {
  height: 600px;
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
      this.gear1SVG.attr("height", (newVal[this.histogramLap].gear1Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
      this.gear2SVG.attr("height", (newVal[this.histogramLap].gear2Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
      this.gear3SVG.attr("height", (newVal[this.histogramLap].gear3Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
      this.gear4SVG.attr("height", (newVal[this.histogramLap].gear4Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
      this.gear5SVG.attr("height", (newVal[this.histogramLap].gear5Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
      this.gear6SVG.attr("height", (newVal[this.histogramLap].gear6Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
      this.gear7SVG.attr("height", (newVal[this.histogramLap].gear7Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
      this.gear8SVG.attr("height", (newVal[this.histogramLap].gear8Time / (newVal[this.histogramLap].dataPointsCount)) * 200);
    }
  },
  mounted: function() {
    this.svgContainer = d3.select("#histogramSVG").append("svg").attr("width", 160).attr("height", 200);
    this.gear1SVG = this.svgContainer.append("rect").attr("x", 0).attr("y", 0).attr("z", 10).attr("width", 20).style("fill", function(d) { return 'black' });
    this.gear2SVG = this.svgContainer.append("rect").attr("x", 20).attr("y", 0).attr("z", 10).attr("width", 20).style("fill", function(d) { return 'black' });
    this.gear3SVG = this.svgContainer.append("rect").attr("x", 40).attr("y", 0).attr("z", 10).attr("width", 20).style("fill", function(d) { return 'black' });
    this.gear4SVG = this.svgContainer.append("rect").attr("x", 60).attr("y", 0).attr("z", 10).attr("width", 20).style("fill", function(d) { return 'black' });
    this.gear5SVG = this.svgContainer.append("rect").attr("x", 80).attr("y", 0).attr("z", 10).attr("width", 20).style("fill", function(d) { return 'black' });
    this.gear6SVG = this.svgContainer.append("rect").attr("x", 100).attr("y", 0).attr("z", 10).attr("width", 20).style("fill", function(d) { return 'black' });
    this.gear7SVG = this.svgContainer.append("rect").attr("x", 120).attr("y", 0).attr("z", 10).attr("width", 20).style("fill", function(d) { return 'black' });
    this.gear8SVG = this.svgContainer.append("rect").attr("x", 140).attr("y", 0).attr("z", 10).attr("width", 20).style("fill", function(d) { return 'black' });
  }
};
</script>
