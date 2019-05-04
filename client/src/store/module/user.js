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
      console.log(val);
      state.name = val.username;
    }
  },
  actions: {
    Login({ commit }, val) {
      // axios
      //   .post(user.login, val)
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      return new Promise((resolve, reject) => {
        // setTimeout(() => {
        //   setToken(val);
        //   commit('SET_TOKEN', val);
        //   resolve(true);
        // }, 1000);
        // login(val)
        //   .then(res => {
        //     setToken('tokenval');
        //     resolve(res);
        //   })
        //   .catch(err => {
        //     reject(err);
        //   });
      });
    },
    async Register({ commit }, { values, callback }) {
      // console.log(commit, values);
      try {
        const result = await axios.post(user.register, values);
        callback(result);
        if (result.status == 1) {
          commit('SET_TOKEN', 123);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
