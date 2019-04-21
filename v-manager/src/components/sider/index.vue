<template>
    <a-layout-sider :trigger="null"
                    collapsible
                    breakpoint="lg"
                    v-model="collapsed">

        <div class="logo" />

        <a-menu :defaultSelectedKeys="['1']"
                :defaultOpenKeys="['sub1']"
                mode="inline"
                theme="dark"
                :inlineCollapsed="collapsed">
            <a-menu-item key="1">
                <router-link id="test"
                             to="/">
                    <a-icon type="desktop" />
                    <span>介绍</span>
                </router-link>
            </a-menu-item>

            <a-sub-menu key="2">
                <span slot="title">
                    <a-icon type="dashboard" />
                    <span>仪表盘</span>
                </span>
                <a-menu-item key="21">
                    <router-link id="test"
                                 to="/test">
                        <span>图表</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="22">Option 6</a-menu-item>
            </a-sub-menu>

            <a-menu-item key="3">
                <a-icon type="inbox" />
                <span>Option 3</span>
            </a-menu-item>

            <a-sub-menu key="sub1">
                <span slot="title">
                    <a-icon type="mail" />
                    <span>Navigation One</span>
                </span>
                <a-menu-item key="5">Option 5</a-menu-item>
                <a-menu-item key="6">Option 6</a-menu-item>
                <a-menu-item key="7">Option 7</a-menu-item>
                <a-menu-item key="8">Option 8</a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="sub2">
                <span slot="title">
                    <a-icon type="appstore" />
                    <span>系统管理</span>
                </span>
                <a-menu-item key="9">账户管理</a-menu-item>
                <a-menu-item key="10">菜单管理</a-menu-item>
                <a-sub-menu key="sub3"
                            title="Submenu">
                    <a-menu-item key="11">Option 11</a-menu-item>
                    <a-menu-item key="12">Option 12</a-menu-item>
                </a-sub-menu>
            </a-sub-menu>
        </a-menu>

    </a-layout-sider>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>


