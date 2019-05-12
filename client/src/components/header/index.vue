<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsedFN" />
    <div class="user_wrap">
      <!-- 通知 -->
      <div class="user_wrap_bell action">
        <a-dropdown @visibleChange="visibleValue=$event"
                    :visible='false'>
          <div class="ant-dropdown-link">
            <a-badge :count="10"
                     :overflowCount="99">
              <a-icon type="bell" />
            </a-badge>
          </div>
          <a-menu slot="overlay">
            <a-tabs defaultActiveKey="1"
                    class="user_msg_tab"
                    :tabBarGutter='50'>
              <a-tab-pane tab="通知"
                          key="1">通知</a-tab-pane>
              <a-tab-pane tab="消息"
                          key="2">msg xxxxx</a-tab-pane>
              <a-tab-pane tab="待办"
                          key="3">msg xxxxx</a-tab-pane>
            </a-tabs>
          </a-menu>
        </a-dropdown>
      </div>
      <!-- 个人信息菜单 -->
      <a-dropdown>
        <div class="ant-dropdown-link action">
          <a-avatar icon="user"
                    src='' />
          <span style="margin-left:5px;"
                @click="getMsg">{{$store.getters.userName}}</span>
        </div>
        <a-menu slot="overlay">
          <a-menu-item>
            <a-icon type="user" />个人中心
          </a-menu-item>
          <a-menu-item>
            <a-icon type="setting" />账户设置
          </a-menu-item>
          <a-menu-item disabled>
            <a-icon type="lock" />锁定账户
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="logout">
            <a-icon type="poweroff" /> 退出登录
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>

  </a-layout-header>
</template>

<script>
import { mapActions } from 'vuex';

import { user } from '@/api/user';

export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visibleValue: false
    };
  },
  created() {
    // console.log(this.$store.getters['User/filtercount']);
  },

  methods: {
    ...mapActions('User', ['LogOut']),
    collapsedFN() {
      this.$emit('changeCollapsed'); //Parents listen through on('xx',()=>...) or @xxx
    },
    logout() {
      this.LogOut({
        callback: result => {
          this.$notification['success']({
            message: '退出成功',
            description: '2秒后跳转',
            duration: 2
          });
          setTimeout(() => {
            this.$router.push({
              name: 'login'
            });
          }, 2000);
        }
      });
    },
    getMsg() {
      this.axios.post(user.msg);
    }
  }
};
</script>

<style scoped lang='less'>
.user_wrap {
  float: right;
  padding-right: 20px;
  cursor: pointer;
  .user_wrap_bell {
    float: left;
    padding: 0 15px;
    margin-right: 15px;
    i {
      vertical-align: middle;
    }
    .anticon-bell {
      font-size: 20px;
      margin-top: 5px;
    }
  }

  .ant-dropdown-link {
    float: left;
  }
}
.ant-dropdown-menu-item {
}
.user_msg_tab {
  padding: 0 15px;
}
</style>


