<template>
  <div class="message-chat">
    <van-tabs v-model="active">
      <van-tab title="聊天">
        <Chat></Chat>
      </van-tab>
      <van-tab title="看房">
        <NoticeList></NoticeList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Chat from "~/components/chat";
import NoticeList from "~/components/notice";
export default {
  layout: "normal",
  components: {
    Chat,
    NoticeList
  },
  data() {
    return {
      active: 2
    };
  },
  beforeCreate() {
    this.$store.commit("setShowConcat", true);
  },
  beforeDestroy() {
    this.$store.commit("setShowConcat", false);
  }
};
</script>

<style lang="scss">
.message-chat {
  padding: 0 0 20px;
}
</style>
