<template>
  <a-layout id="components-layout-demo-custom-trigger">

    <Sider :collapsed='collapsed' />

    <a-layout>
      <Header :collapsed='collapsed'
              @changeCollapsed='collapsed = !collapsed' />
      <router-view/>

    </a-layout>

  </a-layout>
</template>

<script>
import Sider from '@/components/sider/';
import Header from '@/components/header/';

export default {
  name: 'MainLayout',
  data() {
    return {
      collapsed: false
    };
  },
  components: {
    Sider,
    Header
  },
  methods: {}
};
</script>

<style  lang='less'>
#components-layout-demo-custom-trigger {
  width: 100%;
  height: 100%;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
}
</style>

