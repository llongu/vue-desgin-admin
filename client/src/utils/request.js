import axios from 'axios';
import notification from 'ant-design-vue/es/notification';
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
      // console.warn(JSON.parse(data).status);
      let res = data && JSON.parse(data);
      switch (res.status) {
        case 2:
          notification['warning']({
            message: '警告',
            description: res.msg || '请求出现错误，请稍后再试',
            duration: 2
          });
          break;
        default:
          break;
      }
      return res;
    }
  ]
});

const err = error => {
  if (!error.response) {
    this.$notification['error']({
      message: '错误',
      description: 'error response null',
      duration: 3
    });
  }
  let res = error.response.data;
  switch (res.code) {
    case 400:
      notification['warning']({
        message: '警告',
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
  config.headers['Content-Type'] = 'application/json'; // 去掉这项 需解决反斜杠问题
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
