import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

import { axios } from '@/utils/request';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

import '@/permission';

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
