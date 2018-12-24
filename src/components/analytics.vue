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

export default {
  props: [],
  data() {
    return {
      dataPointsCount: 0,
      averageSpeed: 0,
      averageRPMs: 0
    };
  },
  computed: {

  },
  created() {
    serverBus.$on('updateAnalytics', (server) => {
      this.dataPointsCount = server.dataPointsCount;
      this.averageSpeed = server.averageSpeed;
      this.averageRPMs = server.averageRPMs;
    });
  }
};
</script>
