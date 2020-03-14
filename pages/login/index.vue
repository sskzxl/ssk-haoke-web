<template>
  <div class="hk-login">
    <HeaderBasic isBack></HeaderBasic>
    <van-form @submit="handleSubmit">
      <van-field
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-if="loginType === 1"
        v-model="identifying"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <van-button slot="button" size="small" type="primary"
          >发送验证码</van-button
        >
      </van-field>
      <van-field
        v-if="loginType === 2"
        v-model="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <p class="hk-login__text">
        <van-checkbox v-model="agre">
          我已同意 <a>好客租房用户服务协议</a></van-checkbox
        >
      </p>
      <p class="hk-login__text">
        未注册手机验证后既注册
      </p>
      <div style="margin: 36px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <p class="hk-login__text" @click="handleChangeLoginType">
      忘记密码，用验证码登录
    </p>
  </div>
</template>

<script>
import HeaderBasic from "~/components/header/HeaderBasic";
export default {
  layout: "basic",
  components: {
    HeaderBasic
  },
  data() {
    return {
      phone: "",
      identifying: "",
      password: "",
      agre: true,
      loginType: 1 // 1 验证码登录， 2 密码登录
    };
  },
  beforeCreate() {
    this.$store.commit("setTitle", "手机号登录");
  },
  methods: {
    handleSubmit() {
        console.log('this.$http')
    },
    handleChangeLoginType() {
      this.loginType = this.loginType === 1 ? 2 : 1;
    }
  }
};
</script>

<style lang="scss">
.hk-login {
  //   margin: 0;
  background: transparent;
  overflow: hidden;
}
.hk-login__text {
  margin-left: 10px;
  color: #999;
  font-size: 14px;
  margin: 10px 10px;
}
</style>
