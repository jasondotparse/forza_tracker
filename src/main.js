import Vue from "vue";
import App from "./App.vue";
import Tachometer from "./components/tachometer.vue";
import Telemetry from "./components/telemetry.vue";
import RaceStats from "./components/racestats.vue";
import TiresDisplay from "./components/tiresDisplay.vue";
import VueResource from "vue-resource";

Vue.component("tachometer", Tachometer);
Vue.component("telemetry", Telemetry);
Vue.component("racestats", RaceStats);
Vue.component("tiresDisplay", TiresDisplay);

Vue.use(VueResource);

new Vue({
  el: "#app",
  render: h => h(App)
});
