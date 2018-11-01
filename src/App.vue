<template>
  <div id="app">
    <div v-if="forzaData">
      <h1>{{ title }}</h1>
      <tachometer v-bind:rpmCurrent="forzaData.rpmCurrent" v-bind:rpmMax="forzaData.rpmMax" v-bind:rpmIdle="forzaData.rpmIdle"></tachometer>
      <telemetry v-bind:speedMPH="forzaData.speedMPH"></telemetry>
      <racestats 
        v-bind:carOrdinal="forzaData.carOrdinal"
        v-bind:carClass="forzaData.carClass"
        v-bind:carPerformanceIndex="forzaData.carPerformanceIndex"
        v-bind:drivetrainType="forzaData.drivetrainType"
        v-bind:numCylinders="forzaData.numCylinders"
        v-bind:bestLap="forzaData.raceBestLap"
        v-bind:currentLap="forzaData.raceCurrentLap"
        v-bind:lastLap="forzaData.lastLap"></racestats>
    </div>
    <div v-if="!forzaData">
      <h1>no data</h1>
      <p>to get started, go to your Forza 7 in-game HUD and add a data out host and IP address.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      title: "Dashboard",
      forzaData: null
    };
  },
  methods: {

  },
  created: function() {
    setInterval(function() {

      this.$http.get("http://localhost:3000/data").then(res => {
        if (res.bodyText === 'no data') {
          this.forzaData = null;
        } else {
          this.forzaData = res.body;
        }
      });

    }.bind(this), 33);
  }
};
</script>
