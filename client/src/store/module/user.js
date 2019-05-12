import { setToken, rmToken } from '@/utils/auth';
import { user } from '@/api/user';
import { axios } from '@/utils/request';

let USER_INFO = JSON.parse(window.localStorage.getItem('USER_INFO'));

export default {
  namespaced: true,
  state: {
    id: USER_INFO && USER_INFO.id,
    name: USER_INFO && USER_INFO.name,

    head: '',
    msg: ''
  },
  getters: {
    filtercount: state => {
      //相当与计算属性
      return state.name + '#';
    }
  },
  mutations: {
    //直接变更状态 (如果这里使用异步代码会影响vue-devtools调试)
    SET_USER_INFO: (state, val) => {
      Object.assign(state, val);
    }
  },
  actions: {
    async Login({ commit }, { values, callback }) {
      try {
        const result = await axios.post(user.login, values);
        if (result.status == 1) {
          // console.log(result);
          let data = {
            id: result.data.id,
            name: result.data.email
          };
          setToken(result.data.token);
          window.localStorage.setItem('USER_INFO', JSON.stringify(data));
          commit('SET_USER_INFO', data);
        }
        callback(result);
      } catch (error) {
        callback(error);
        console.log(error);
      }
    },
    async Register({ commit }, { values, callback }) {
      try {
        const result = await axios.post(user.register, values);
        if (result.status == 1) {
        }
        callback(result);
      } catch (error) {
        callback(error);
        console.log(error);
      }
    },
    async LogOut({ commit }, { callback }) {
      setTimeout(() => {
        rmToken();
        window.localStorage.removeItem('USER_INFO');
        let data = {
          id: '',
          name: ''
        };
        setTimeout(() => {
          commit('SET_USER_INFO', data);
        }, 0);
      }, 2000);
      callback();
    }
  }
};
