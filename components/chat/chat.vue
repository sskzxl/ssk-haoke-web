<template>
  <van-row
    type="flex"
    :class="`chat-item ${direction === 'r' ? 'chat-item--reverse' : ''}`"
  >
    <van-col span="6">
      <van-image round width="60" height="60" :src="message.img" />
    </van-col>
    <van-col span="18">
      <div class="chat-item__message">
        {{ message.text }}
      </div>
    </van-col>
  </van-row>
</template>

<script>
export default {
  props: {
    direction: {
      default: "l",
      required: false
    },
    message: {
      default() {
        return {};
      },
      required: true
    }
  }
};
</script>

<style lang="scss">
.chat-item {
  padding: 20px 0;
  .van-col--6 {
    text-align: center;
  }
}
.chat-item__message {
  width: 90%;
  padding-bottom: 10px;
  // min-height: 100px;
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 0 4px 0 #ddd;
}
.chat-item--reverse {
  flex-flow: row-reverse;

  .chat-item__message {
    margin: 0 auto;
  }
}
</style>
