<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <tachometer></tachometer>
    <div style="font-size: 100px;">RPM: {{ rpm }}</div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      title: "Dashboard",
      rpm: 0
    };
  },
  methods: {

  },
  created: function() {
    let that = this;
    setInterval(function() {

      that.$http.get("http://localhost:3000/data").then(res => {
        that.rpm = Math.round(res.body.rpmCurrent);
      });

    }, 20);
  }
};
</script>
