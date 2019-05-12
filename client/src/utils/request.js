import axios from 'axios';
import notification from 'ant-design-vue/es/notification';
import store from '@/store';
import { getToken } from '@/utils/auth';

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // api base_url 开发模式动态配置
  timeout: 30000, // 请求超时时间
  transformRequest: [
    function(data) {
      // console.warn(data);
      return JSON.stringify(data);
    }
  ],
  transformResponse: [
    function(data) {
      // 对 data 进行任意转换处理
      console.warn(data);
      try {
        let res = data && JSON.parse(data);
        if (res.status == 2) {
          switch (res.code) {
            case 200:
              notification['warning']({
                message: '警告',
                description: res.msg || '请求出现错误，请稍后再试',
                duration: 2
              });
              break;
            case 401:
              notification['warning']({
                message: '警告',
                description: res.msg || '请求出现错误，请稍后再试',
                duration: 2
              });

              store.dispatch('User/LogOut', {
                callback: result => {
                  setTimeout(() => {
                    location.href = './login';
                  }, 2000);
                }
              });

              break;
            default:
              break;
          }
        }
        return res;
      } catch (error) {
        return error;
      }
    }
  ]
});

const err = error => {
  if (!error.response) {
    notification['error']({
      message: '错误',
      description: error || 'error response null',
      duration: 3
    });
    return Promise.reject(error);
  }
  let res = error.response.data;
  switch (res.code) {
    case 400:
      notification['warning']({
        message: '错误',
        description: res.msg || '请求出现错误，请稍后再试',
        duration: 3
      });
      break;
    default:
      notification['error']({
        message: '错误',
        description: res.msg || '请求出现错误，请稍后再试',
        duration: 3
      });
      break;
  }

  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json'; // json
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
