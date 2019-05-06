import { setToken } from '@/utils/auth';
import { user } from '@/api/user';
import { axios } from '@/utils/request';

export default {
  namespaced: true,
  state: {
    name: '',
    head: '',
    msg: '',
    token: ''
  },
  getters: {
    filtercount: state => {
      //相当与计算属性
      return state.shopNum + '#';
    }
  },
  mutations: {
    //直接变更状态 (如果这里使用异步代码会影响vue-devtools调试)
    SET_TOKEN: (state, val) => {
      state.name = val.userName;
      state.token = val.userToken;
    }
  },
  actions: {
    async Login({ commit }, { values, callback }) {
      try {
        const result = await axios.post(user.login, values);
        callback(result);
        if (result.status == 1) {
          let data = {
            userName: values.username,
            userToken: result.data.token
          };
          setToken(result.data.token);
          commit('SET_TOKEN', data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async Register({ commit }, { values, callback }) {
      try {
        const result = await axios.post(user.register, values);
        callback(result);
        if (result.status == 1) {
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
