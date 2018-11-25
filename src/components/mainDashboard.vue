<template>
  <div id="app" class="mainDashboard">
    <div v-if="forzaData" class="container">
      <h1 id="title" class="row">{{ title }}</h1>
      <div class="row">
        <div class="col-sm" id="col1">
          <tachometer 
            v-bind:rpmCurrent="forzaData.rpmCurrent" 
            v-bind:rpmMax="forzaData.rpmMax" 
            v-bind:rpmIdle="forzaData.rpmIdle"
            v-bind:gear="forzaData.gear">
          </tachometer>
        </div>
        <div class="col-sm" id="col2">
          <div class="row">
            <telemetry
              v-bind:speedMPH="forzaData.speedMPH"
              v-bind:power="forzaData.power"
              v-bind:torque="forzaData.torque">
            </telemetry>
          </div>
          <div class="row">
            <tiresDisplay
              v-bind:tireFrictionFL="forzaData.tireFrictionFL"
              v-bind:tireFrictionFR="forzaData.tireFrictionFR"
              v-bind:tireFrictionBL="forzaData.tireFrictionBL"
              v-bind:tireFrictionBR="forzaData.tireFrictionBR">
            </tiresDisplay>
          </div>
        </div>
        <div class="col-sm" id="col3">
          <racestats 
            v-bind:carOrdinal="forzaData.carOrdinal"
            v-bind:carClass="forzaData.carClass"
            v-bind:carPerformanceIndex="forzaData.carPerformanceIndex"
            v-bind:drivetrainType="forzaData.drivetrainType"
            v-bind:numCylinders="forzaData.numCylinders"
            v-bind:bestLap="forzaData.raceBestLap"
            v-bind:currentLap="forzaData.raceCurrentLap"
            v-bind:lastLap="forzaData.lastLap"
            v-bind:lapNumber="forzaData.lapNumber">
          </racestats>
        </div>
      </div>
    </div>
    <div v-if="!forzaData">
      <h1>no data</h1>
      <p>to get started, go to your Forza 7 in-game HUD and add a data out host and IP address.</p>
    </div>
  </div>
</template>

<style>

.mainDashboard {
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
}

#title {
  font-family: 'Roboto', sans-serif;
}

</style>

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
