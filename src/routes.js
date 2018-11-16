import App from './App.vue';
import MainDashboard from './components/mainDashboard.vue';
import Analytics from './components/analytics.vue';

export default [
  { path: '/', component: MainDashboard },
  { path: '/analytics', component: Analytics }
]