import { setToken } from '@/utils/auth';
import { login } from '@/api/user';

export default {
  state: {},

  mutations: {

    //直接变更状态 (如果这里使用异步代码会影响vue-devtools调试)
    collapsedFN: (state, payload) => {
      state.collapsed = payload;
    }
  },
  actions: {
    todogo({ commit }, val) {
      console.log(val);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);

        // login(val)
        //   .then(res => {
        //     setToken('tokenval');

        //     resolve(res);
        //   })
        //   .catch(err => {
        //     reject(err);
        //   });
      });
    }
  }
};
