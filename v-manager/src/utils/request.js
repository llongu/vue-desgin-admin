import axios from 'axios';
import notification from 'ant-design-vue/es/notification';
import { getToken } from '@/utils/auth';

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // api base_url
  timeout: 30000 // 请求超时时间
});
service.defaults.transformRequest = [
  function(data) {
    console.log(data);
  }
];
const err = error => {

  // if (error.response) {
  //   const data = error.response.data;
  //   const token = Vue.ls.get(ACCESS_TOKEN);
  //   if (error.response.status === 403) {
  //     this.$notification.error({ message: 'Forbidden', description: data.message });
  //   }
  //   if (error.response.status === 401) {
  //     notification.error({
  //       message: 'Unauthorized',
  //       description: 'Authorization verification failed'
  //     });
  //     if (token) {
  //       store.dispatch('Logout').then(() => {
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 1500);
  //       });
  //     }
  //   }
  // }
  return Promise.reject('it"s error');
};

// request interceptor
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['Access-Token'] = getToken(); // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config;
}, err);

// response interceptor
service.interceptors.response.use(response => {
  return response.data;
}, err);

export { service as axios };
