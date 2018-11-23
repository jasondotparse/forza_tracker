<template>
  <div>
    <div>this is the analytics component!</div>
    <div>average speed: {{ averageSpeed }}</div>
    <div>average RPM: {{ averageRPM }}</div>
    <a href='/#/'>Back to dashboard</a>
  </div>
</template>

<script>
import analyticsService from '../services/analytics.service.js';

export default {
  props: [],
  data() {
    return {
      
    };
  },
  computed: {
    averageSpeed: () => analyticsService.averageSpeed,
    averageRPM: () => analyticsService.averageRPM
  }
};
</script>
