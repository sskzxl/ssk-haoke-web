<template>
  <div class="hk-login">
    <HeaderBasic isBack></HeaderBasic>
    <van-form @submit="handleSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-if="false"
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
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <van-field name="host" label="单选框">
        <template #input>
          <van-radio-group v-model="host" direction="horizontal">
            <van-radio :name="1">房东</van-radio>
            <van-radio :name="2">租客</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <p class="hk-login__text">
        <van-checkbox v-model="agre">
          我已同意 <a>好客租房用户服务协议</a></van-checkbox
        >
      </p>
      <!--  <p class="hk-login__text">
        未注册手机验证后既注册
      </p> -->
      <div style="margin: 36px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <nuxt-link to="/login" style="font-size: 14px;margin-left: 10px">
      已经注册？点击登录
    </nuxt-link>
    <!--  <p class="hk-login__text" @click="handleChangeLoginType">
      忘记密码，用验证码登录
    </p> -->
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
      username: "",
      password: "",
      loginType: 2,
      host: 1,
      agre: true
    };
  },
  beforeCreate() {
    this.$store.commit("setTitle", "用户注册");
  },
  methods: {
    handleSubmit() {
      if (!this.agre) {
        this.$toast("使用本服务需要同意用户协议");
      }
      this.$http
        .post("/api/users/register", {
          username: this.username,
          password: this.password,
          isHost: this.host
          // username: ''
        })
        .then(res => {
          if (res.status === 0) {
            this.$toast.success("注册成功");
            this.$router.push('/login');
          } else {
            this.$toast.fail(res.resultMsg);
          }
        });
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
