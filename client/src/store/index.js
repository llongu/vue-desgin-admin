import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import User from './module/user';
import Todo from './module/todo';
import getters from './getters';

const store = new Vuex.Store({
  //基本数据获取 this.$store.state.baseState
  //modules 每个模块拥有自己的属性和方法   //  console.log(this.$store.state.moduleNmae)

  state: {
    baseState: 'test'
  },

  mutations: {},
  actions: {},

  modules: {
    User,
    Todo
  },
  getters
});

export default store;
