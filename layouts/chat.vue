<template>
  <div class="layout-chat">
    <van-nav-bar fixed="" :title="title" left-arrow @click-left="handleBack"/>
    <div class="chat-list">
      <transition name="page">
        <nuxt/>
      </transition>
    </div>
    <div class="chat-input">
      <van-row>
        <van-col span="18">
          <van-field v-model="message" placeholder="输入内容"/>
        </van-col>
        <van-col span="3">
          <van-icon name="smile-o"/>
        </van-col>
        <van-col span="3">
          <van-icon
            name="upgrade"
            @click="handlePushMessage"
            v-if="message.length"
          />
          <van-icon name="plus" @click="handleAddMedia" v-else/>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "",
        message: ""
      };
    },
    methods: {
      handlePushMessage() {
      },
      handleAddMedia() {
      },
      handleBack() {
        this.$router.back()
      }
    }
  };
</script>

<style lang="scss">
  .chat-list {
    padding: 45px 0;
    height: calc(100vh - 30px);
    background-color: #f1f1f1;
    overflow: scroll;
  }

  .chat-input {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 4px 0;
    background-color: #eee;
    border-top: 1px solid #ddd;
    line-height: 44px;
    text-align: center;

    .van-icon {
      font-size: 30px;
      vertical-align: middle;
    }
  }
</style>
