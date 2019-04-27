const CommonLoayout = () =>
  import(/* webpackChunkName: "group-commonLoayout" */ '@/components/layouts/commonLayout');
const UserLoayout = () =>
  import(/* webpackChunkName: "group-userLayout" */ '@/components/layouts/userLayout');
const MainLayout = () =>
  import(/* webpackChunkName: "group-mainLayout" */ '@/components/layouts/mainLayout');

export { CommonLoayout, UserLoayout, MainLayout };
