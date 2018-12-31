import Vue from "vue";
import App from "./App.vue";
import Tachometer from "./components/tachometer.vue";
import Telemetry from "./components/telemetry.vue";
import RaceStats from "./components/racestats.vue";
import TiresDisplay from "./components/tiresDisplay.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import Routes from "./routes";
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.component("tachometer", Tachometer);
Vue.component("telemetry", Telemetry);
Vue.component("racestats", RaceStats);
Vue.component("tiresDisplay", TiresDisplay);

Vue.use(VueResource);
Vue.use(VueRouter);

export const router = new VueRouter({
  routes: Routes
})

export const serverBus = new Vue();

new Vue({
  el: "#app",
  render: h => h(App),
  router: router
});
