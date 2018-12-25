<template>
  <div>
    <h1>race analytics</h1>
    <div>Click a lap number to see analytics gathered and tuning suggestions.</div>

    
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
      allAnalyticsData: {}
    };
  },
  computed: {

  },
  created() {
    serverBus.$on('updateAnalytics', (server) => {
      this.analyticsData = server;

      // todo: analytics component now receives data from each lap, as well as the current lap. Display it in UI.
    });
  }
};
</script>
