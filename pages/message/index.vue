<template>
  <div class="message-chat">
    <van-tabs v-model="active">
      <van-tab title="聊天">
        <Chat></Chat>
      </van-tab>
      <van-tab>
        <template v-slot:title>
          通知
          <van-icon name="chat-o" info="9" />
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Chat from "~/components/chat";
export default {
  layout: "normal",
  components: {
    Chat,
  },
  data() {
    return {
      active: 2
    }
  },
  beforeCreate() {
    this.$store.commit('setShowConcat', true)
  },
  beforeDestroy() {
    this.$store.commit('setShowConcat', false)
  },
};
</script>

<style lang="scss">
.message-chat {
  padding: 0 0 20px;
}
</style>
