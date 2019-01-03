<template>
  <div>
    <h1>race analytics</h1>
    <div>Click a lap number to see analytics gathered and tuning suggestions.</div>

    <div class="row">
      <table class="table table-striped col-sm" id="col1">
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
        <tr v-for="(value, key) in lapData" :key="value.id">
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
      <div class="col-sm" id="histogram">
        <h3>histogram will go here</h3>
      </div>
    </div>
  
  <a href='/#/'>Back to dashboard</a>
  </div>
</template>

<style>

.table {
  font-size: 12px;
  padding: 10px;
}

.row {
  margin-left: 10px;
}

</style>

<script>

import { serverBus } from '../main.js';
import Vue from "vue";

/*
  displays the following information to the user:
  FOR EACH LAP:
  lap time
  avg speed
  avg rpm
  avg torque
  avg tire friction in each tire (click for tuning suggestion to appear on right)
  time spent in each gear, as a histogram (click for tuning suggestion to appear on right)
*/

import { router } from '../main.js';

export default {
  props: [],
  data() {
    return {
      allAnalyticsData: {},
      lapData: {}
    };
  },
  computed: {

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
  }
};
</script>
