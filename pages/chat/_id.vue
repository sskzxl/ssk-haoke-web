<template>
  <div class="layout-chat">
    <van-nav-bar fixed="" :title="title" left-arrow @click-left="handleBack" />
    <div class="chat-list" ref="ChatWrap">
      <transition name="page">
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
                <van-field v-model="message" placeholder="输入内容" />
              </van-col>
              <van-col span="3">
                <van-icon name="smile-o" />
              </van-col>
              <van-col span="3">
                <van-icon
                  name="upgrade"
                  @click="handlePushMessage"
                  v-if="message.length"
                />
                <van-icon name="plus" @click="handleAddMedia" v-else />
              </van-col>
            </van-row>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ChatItem from "~/components/chat/chat";
import { getRecordListByIM, getContact } from "~/plugins/apis";
let ws;
const maxConnectionCount = 10;
export default {
  layout: "basic",
  components: {
    ChatItem
  },
  data() {
    return {
      title: "",
      message: "",
      messages: [],
      reConnection: 0
    };
  },
  computed: {
    ...mapState(["token", "user"])
  },
  beforeCreate() {
    this.$store.commit("setTitle", this.$route.params.name);
  },
  mounted() {
    this.title = this.$route.query.contact;
    if (this.user) {
      //所联系房东是自己
      if (this.user.id == this.$route.params.id) {
        console.log("自己人");
      }
      //添加到聊天好友列表
      getContact(this.user.id, this.$route.params.id);
      console.log(this.user.id, this.$route.params.id);
      //获取聊天记录
      getRecordListByIM(this.user.id, this.$route.params.id).then(res => {
        res.data.forEach(item => {
          this.messages.push({
            text: item.msg,
            // 获取到的消息对象中 from.id和当前用户相等，则消息是自己的，在右边，否则
            direction: item.from.id === this.user.id ? "r" : "l",
            user:
              item.from.id === this.user.id
                ? item.from.username
                : item.to.username
          });
        });
        this.scrollBottom();
      });
      this.connectWs();
    } else {
      this.getUserInfo().then(res => {
        getRecordListByIM(this.user.id, this.$route.params.id).then(res => {
          console.log(this.$route.params.id, this.user.id);
          getContact(this.$route.params.id, this.user.id);
          res.data.forEach(item => {
            this.messages.push({
              text: item.msg,
              direction: item.from.id === this.user.id ? "r" : "l",
              user:
                item.from.id === this.user.id
                  ? item.from.username
                  : item.to.username
            });
          });
          //翻到聊天最底部
          this.scrollBottom();
        });
        this.connectWs();
      });
    }
  },
  destroyed() {
    ws.close();
    ws = null;
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    connectWs() {
      // ws = new WebSocket(`ws://haoke.natapp1.cc/ws/1001`);
      ws = new WebSocket(`ws://haoke.natapp1.cc/ws/${this.user.id}`);
      ws.onmessage = this.handleWsMessage.bind(this);
      ws.onerror = this.handleWsError.bind(this);
    },
    handleWsError() {
      this.$toast.fail("WS连接出错，正在重试!");
      this.reConnection++;
      if (this.reConnection < maxConnectionCount) {
        setTimeout(() => {
          this.connectWs();
        }, 2000);
      }
    },
    handleWsMessage(event) {
      const data = event.data;
      this.messages.push({
        text: data.msg,
        direction: data.from.id === this.$route.params.id ? "r" : "l",
        user:
          data.from.id === this.$route.params.id
            ? data.from.username
            : data.to.username
      });
    },
    handlePushMessage() {
      // ws.send(JSON.stringify({ toId: 1002, msg: this.message }));
      ws.send(
        JSON.stringify({ toId: this.$route.params.id, msg: this.message })
      );
      this.messages.push({ text: this.message, direction: "r" });
      this.message = "";
      this.scrollBottom();
    },
    handleAddMedia() {},
    scrollBottom() {
      this.$nextTick().then(() => {
        const $ChatWrap = this.$refs.ChatWrap;
        $ChatWrap.scrollTop = $ChatWrap.scrollHeight;
      });
    },
    handleBack() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss">
.chat-list {
  padding: 0;
  height: calc(100vh - 90px);
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
