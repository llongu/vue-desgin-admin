import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import User from './module/user';
import Todo from './module/todo';

const store = new Vuex.Store({

  //modules 每个模块拥有自己的属性和方法   //  console.log(this.$store.state.todos)
  modules: {
    User,
    Todo
  }
});

export default store;
