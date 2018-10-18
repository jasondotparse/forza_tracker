<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <tachometer v-bind:rpmCurrent="forzaData.rpmCurrent" v-bind:rpmMax="forzaData.rpmMax" v-bind:rpmIdle="forzaData.rpmIdle"></tachometer>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      title: "Dashboard",
      forzaData: {}
    };
  },
  methods: {

  },
  created: function() {
    setInterval(function() {

      this.$http.get("http://localhost:3000/data").then(res => {
        this.forzaData = res.body;
      });

      console.log(this.forzaData)

    }.bind(this), 20);
  }
};
</script>
