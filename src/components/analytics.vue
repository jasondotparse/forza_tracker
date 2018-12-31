<template>
  <div>
    <h1>race analytics</h1>
    <div>Click a lap number to see analytics gathered and tuning suggestions.</div>

    <div v-for="(value, key) in lapData" :key="value.id">
      <h3>{{key}}</h3>
      <div>
        dataPointsCount: {{ value.dataPointsCount }}
        averageRPMs: {{ value.averageRPMs }}
        averageSpeed: {{ value.averageSpeed }}
        averageTireFrictionFL: {{ value.averageFrictionFL }}
        averageTireFrictionFR: {{ value.averageFrictionFR }}
        averageTireFrictionBL: {{ value.averageFrictionBL }}
        averageTireFrictionBR: {{ value.averageFrictionBR }}
      </div>
    </div>
    
    <a href='/#/'>Back to dashboard</a>
  </div>
</template>

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
  }
};
</script>
