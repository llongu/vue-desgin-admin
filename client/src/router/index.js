import Vue from 'vue';
import VueRouter from 'vue-router';
import { constantRouterMap } from './routerMap';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: constantRouterMap,
  scrollBehavior: () => ({ y: 0 })
});

export default router;
