<template>
  <div>
    <div>this is the analytics component!</div>
    <div>total data points processed: {{ dataPointsCount }}</div>
    <div>average speed: {{ averageSpeed }}</div>
    <div>average RPM: {{ averageRPMs }}</div>
    <a href='/#/'>Back to dashboard</a>
  </div>
</template>

<script>

import { serverBus } from '../main.js';

export default {
  props: [],
  data() {
    return {
      dataPointsCount: 0,
      totalSpeed: 0,
      totalRPMs: 0
    };
  },
  computed: {
    averageSpeed: function() {
      return this.totalSpeed / this.dataPointsCount;
    },
    averageRPMs: function() {
      return this.totalRPMs / this.dataPointsCount
    }
  },
  created() {
    serverBus.$on('updateAnalytics', (server) => {
      // all data from API included in the 'server' object
      this.dataPointsCount++;
      this.totalSpeed += Number(server.speedMPH);
      this.totalRPMs += Number(server.rpmCurrent);
    });
  }
};
</script>
