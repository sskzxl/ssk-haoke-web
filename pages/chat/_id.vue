<template>
  <div class="resource-chat-id">
    <ChatItem
      v-for="(message, idx) in messages"
      :key="message.text + idx"
      :message="message"
      :direction="message.direction"
    ></ChatItem>
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
import { mapState, mapActions } from "vuex";
import ChatItem from "~/components/chat/chat";
import { getRecordListByIM } from "~/plugins/apis";
let ws;
export default {
  layout: "chat",
  components: {
    ChatItem
  },
  data() {
    return {
      message: '',
      messages: []
    };
  },
  computed: {
    ...mapState(["token", "user"])
  },
  beforeCreate() {
    this.$store.commit("setTitle", this.$route.params.name);
  },
  mounted() {
    console.log('x');
    
    if (this.user) {
      getRecordListByIM(this.user.id, this.$route.params.id).then(res => {});
      this.connectWs();
    } else {
      this.getUserInfo().then(res => {
        getRecordListByIM(this.user.id, this.$route.params.id).then(res => {});
        this.connectWs();
      });
    }
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    connectWs() {
      ws = new WebSocket(`ws://haoke.natapp1.cc/ws/${this.$store.state.user.id}`);
      ws.onmessage = this.handleWsMessage.bind(this);
    },
    handleWsMessage(event) {
    },
    handlePushMessage() {
      ws.send(JSON.stringify({toId: this.$route.params.id, msg: this.message}));
      // ws.send(JSON.stringify({toId: this.$route.params.id, msg: this.message}));
      this.messages.push({ text: this.message, direction: 'r' });
      this.message = '';
    },
    handleAddMedia() {}
  }
};
</script>

<style></style>
  