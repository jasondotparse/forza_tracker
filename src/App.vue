<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

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

  }
};
</script>
