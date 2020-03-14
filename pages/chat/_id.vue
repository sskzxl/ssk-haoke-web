<template>
  <div class="resource-chat-id">
    <ChatItem
      v-for="(message, idx) in messages"
      :key="message.text + idx"
      :message="message"
      :direction="message.direction"
    ></ChatItem>
  </div>
</template>

<script>
import ChatItem from "~/components/chat/chat";
export default {
  layout: "chat",
  components: {
    ChatItem
  },
  data() {
    return {
      messages: [
        { img: "xx", text: "你好", userId: 1, direction: 'l' },
        { img: "xx", text: "你好", userId: 2, direction: 'r' },
        { img: "xx", text: "你好", userId: 2, direction: 'r' },
        { img: "xx", text: "你好", userId: 1, direction: 'l' },
        { img: "xx", text: "你好", userId: 2, direction: 'r' },
        { img: "xx", text: "你好", userId: 1, direction: 'l' },
        { img: "xx", text: "你好", userId: 1, direction: 'l' },
        { img: "xx", text: "你好", userId: 1, direction: 'l' },
        { img: "xx", text: "你好", userId: 1, direction: 'l' }
      ]
    };
  },
  beforeCreate() {
    this.$store.commit("setTitle", this.$route.params.name);
  }
};
</script>

<style></style>
