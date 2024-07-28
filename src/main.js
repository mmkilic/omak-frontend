import Vue from "vue";
import App from "./App";
import router from "./router/index";
import { store } from "./store/store"

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

import axios from "axios";

//axios.defaults.baseURL = 'http://localhost:8080/api-crm';
axios.defaults.baseURL = 'http://13.51.121.98:8080/api-crm';

Vue.use(PaperDashboard);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
/*
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
*/