<template>
  <div class="main">
    <a-form id="formLogin"
            class="user-layout-login"
            ref="formLogin"
            :form="form"
            @submit='loginSubmit'>

      <a-tabs :activeKey="customActiveKey"
              @change='changeActiveKey'
              :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
        <a-tab-pane key="email"
                    tab="账号密码登录">
          <a-form-item>
            <a-input size="large"
                     type="text"
                     placeholder="帐户名或邮箱地址 / admin"
                     v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入正确的帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]">
              <a-icon slot="prefix"
                      type="user"
                      :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input size="large"
                     type="password"
                     autocomplete="false"
                     placeholder="密码 / admin"
                     v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入正确的密码' }], validateTrigger: 'blur'}
              ]">
              <a-icon slot="prefix"
                      type="lock"
                      :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-tab-pane>

        <a-tab-pane key="phone"
                    tab="手机号登录">
          <a-form-item>
            <a-input size="large"
                     type="text"
                     placeholder="手机号"
                     v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]">
              <a-icon slot="prefix"
                      type="mobile"
                      :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row"
                   :span="16">
              <a-form-item>
                <a-input size="large"
                         type="text"
                         placeholder="验证码"
                         v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                  <a-icon slot="prefix"
                          type="mail"
                          :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row"
                   :span="8">
              <a-button class="getCaptcha"
                        tabindex="-1"
                        :disabled="state.smsSendBtn"
                        @click.stop.prevent="getCaptcha"
                        v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
        <router-link :to="{ name: 'recover', params: { user: 'aaa'} }"
                     class="forge-password"
                     style="float: right;">忘记密码</router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button size="large"
                  type="primary"
                  htmlType="submit"
                  class="login-button"
                  :loading="state.loginBtn"
                  :disabled="state.loginBtn">确定</a-button>
      </a-form-item>

      <div class="user-login-other">
        <span>其他登录方式</span>
        <a>
          <a-icon class="item-icon"
                  type="alipay-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon"
                  type="taobao-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon"
                  type="weibo-circle"></a-icon>
        </a>
        <router-link class="register"
                     :to="{ name: 'register' }">注册账户</router-link>
      </div>

    </a-form>
  </div>
</template>

<script>
export default {
  name: "login",

  data() {
    return {
      form: this.$form.createForm(this),
      customActiveKey: "email",
      loginBtn: false,
      loginType: 0,
      state: {
        time: 0,
        loginType: 0,
        loginBtn: false,
        smsSendBtn: false
      }
    };
  },
  methods: {
    changeActiveKey(key) {
      this.customActiveKey = key;
      this.form.resetFields();
    },
    handleUsernameOrEmail(name, value, callback) {
      //自定义校验
      // console.log(value);
      callback();
    },
    getCaptcha(e) {
      e.preventDefault();
      const that = this;
      this.form.validateFields(["mobile"], { force: true }, (err, values) => {
        if (!err) {
          this.state.smsSendBtn = true;

          const interval = window.setInterval(() => {
            if (that.state.time-- <= 0) {
              that.state.time = 60;
              that.state.smsSendBtn = false;
              window.clearInterval(interval);
            }
          }, 1000);

          const hide = this.$message.error(
            "验证码发送失败,输入任意字符即可",
            3
          );
        }
      });
    },
    loginSubmit(e) {
      e.preventDefault();
      const validateFieldsKey =
        this.customActiveKey === "email"
          ? ["username", "password"]
          : ["mobile", "captcha"];

      this.form.validateFields(
        validateFieldsKey,
        { force: true },
        (err, values) => {
          if (err) return false;
          // console.log(values);
          values["loginType"] = this.customActiveKey;
          this.state.loginBtn = true;
          //增加命名空间 User/Login
          this.$store.dispatch("User/Login", {
            values,
            callback: result => {
              if (result.status == 1) {
                this.$notification["success"]({
                  message: result.msg || "登录成功",
                  description: "2秒后跳转",
                  duration: 2
                });
                setTimeout(() => {
                  this.$router.push({ name: "home" });
                }, 2000);
                return;
              }

              this.state.loginBtn = false;
            }
          });
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
