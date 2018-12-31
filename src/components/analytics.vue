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
        gear1Time: {{ value.gear1Time }}
        gear2Time: {{ value.gear2Time }}
        gear3Time: {{ value.gear3Time }}
        gear4Time: {{ value.gear4Time }}
        gear5Time: {{ value.gear5Time }}
        gear6Time: {{ value.gear6Time }}
        gear7Time: {{ value.gear7Time }}
        gear8Time: {{ value.gear8Time }}
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
