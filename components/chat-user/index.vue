<template>
  <div class="hk-chat-user">
    <van-row>
      <van-col span="7">
        <van-image  src="http://image.haoke.com/head/jackma.jpg" class="hk-chat-user-head">

        </van-image>
      </van-col>
      <van-col span="14">
        <p>{{ user.name }}</p>
        <p>已认证房主</p>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: "index.vue",
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  .hk-chat-user {
    p:first-child {
      margin-bottom: 4px;
      font-size: 16px;
      color: #333;
    }
    p:last-child {
      font-size: 14px;
      color: #999;
    }
    .van-button {
      margin-top: 10px;
    }
  }
  .hk-chat-user-head{
    border-radius: 30px;
    width:83px;
    height:60px;
  }
</style>
