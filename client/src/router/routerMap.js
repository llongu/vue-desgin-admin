//npm i babel-plugin-syntax-dynamic-import
//配置/* webpackChunkName: "group-foo" */  Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中 output配置 chunkfilename

import { CommonLoayout, UserLoayout, MainLayout } from './common.js';

//基础路由
const constantRouterMap = [
  {
    path: '*',
    component: CommonLoayout,
    meta: { title: '错误' },
    redirect: '/error/404',
    children: [
      {
        path: '/error/404',
        name: '404',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/pages/error/404')
      },
      {
        path: '/error/403',
        name: '403',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/pages/error/403')
      }
    ]
  },
  {
    path: '/user',
    component: UserLoayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/pages/user/login')
      },
      {
        path: 'recover',
        name: 'recover',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/pages/user/recover')
      },
      {
        path: 'register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/pages/user/register')
      }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        meta: { sider: '介绍', icon: '', title: '首页' },
        component: () => import(/* webpackChunkName: "home" */ '@/pages/home')
      }
    ]
  },
  {
    path: '/test',
    component: MainLayout,
    redirect: '/test',
    children: [
      {
        path: 'test',
        name: 'test',
        meta: { sider: '介绍', icon: '', title: 'test' },
        component: () =>
          import(/* webpackChunkName: "home" */ '@/pages/test/test')
      }
    ]
  }
];

const asyncRouterMap = [];

export { constantRouterMap, asyncRouterMap };
