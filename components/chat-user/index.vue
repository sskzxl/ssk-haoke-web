<template>
  <div class="hk-chat-user">
    <van-row>
      <van-col span="4">
        <van-image></van-image>
      </van-col>
      <van-col span="14">
        <p>{{ user.name }}</p>
        <p>已认证房主</p>
      </van-col>
      <van-col span="6">
        <van-button size="small">发消息</van-button>
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
</style>
