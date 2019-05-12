<template>
  <a-layout id="components-layout-demo-custom-trigger">

    <Sider :collapsed='collapsed'
           ref="refSider" />

    <a-layout>
      <Header :collapsed='collapsed'
              @changeCollapsed='collapsed = !collapsed' />
      <!--tab view  -->
      <a-tabs v-model="activeKey"
              hideAdd
              type="editable-card"
              @change='changeView'
              @edit="onEdit">

        <a-tab-pane v-for="(item,index) in tabArr"
                    :tab="item.title"
                    :key="index"
                    :closable="item.closable">
          <keep-alive :include="keepAliveTab">
            <router-view />
          </keep-alive>

        </a-tab-pane>

      </a-tabs>
      <!--tab view end -->
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
      activeKey: 0,
      tabArr: [{ title: '介绍', closable: false, path: '/home' }],
      hasTab: ['/home'], //添加视图的判断
      keepAliveTab: ['home'], //需要缓存的组件 1.组件name必写 2.路由meta{keepAlive：true} 必写

      collapsed: false
    };
  },
  components: {
    Sider,
    Header
  },
  watch: {
    $route(to, form) {
      // console.log(to, form);
      console.warn(to);
      this.showView(to);
    }
  },
  created() {
    this.showView(this.$route);
  },
  methods: {
    changeView(activeKey) {
      this.showView(false, activeKey);
      //选中菜单
      // this.$refs.refSider.activeMenu
    },
    showView(to, activeKey) {
      //没有添加
      if (to && !this.hasTab.includes(to.path)) {
        to.meta['path'] = to.path;
        this.hasTab.push(to.path);
        this.tabArr.push(to.meta);
        this.activeKey++;
        if (to.meta.keepAlive) {
          this.keepAliveTab.push(to.name);
        }
      } else {
        //有则显示
        if (!activeKey && activeKey != 0) {
          activeKey = this.hasTab.indexOf(to.path);
        }
        this.activeKey = activeKey;
        this.$router.push({
          path: this.tabArr[activeKey].path
        });
      }
    },
    onEdit(targetIndex, action) {
      // console.log(targetIndex, action);
      this[action](targetIndex);
    },
    remove(targetIndex) {
      if (this.tabArr[targetIndex]) {
        //删除视图判断值
        this.hasTab.splice(targetIndex, 1);
        //删除缓存的组件name
        this.keepAliveTab.splice(targetIndex, 1);
        //删除当前视图
        this.tabArr.splice(targetIndex, 1);
      } else {
        console.error('视图移除错误,该视图不存在于tabArr');
      }
      //删除视图为 当前视图
      if (this.activeKey == targetIndex) {
        //被删除视图后面是否还有视图 有则选中
        if (this.activeKey[targetIndex]) {
          this.activeKey = targetIndex;
        } else {
          this.activeKey--;
        }
        this.$router.push({
          path: this.tabArr[this.activeKey].path
        });
      }
    }
  }
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

