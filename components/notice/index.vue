<template>
  <div class="hk-subscribe-list">
    <HeaderBasic isBack></HeaderBasic>

    <van-panel
      :status="item.status == 0 ? '待确认' : 'info'"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="hk_rqMsg">{{ item.msg }}</div>
      <template #footer>
        <van-button size="small" :type="item.status == 0 ? 'danger' : 'info'">{{
          swipeBtn
        }}</van-button>
      </template>
    </van-panel>
  </div>
</template>
<script>
import HeaderBasic from "~/components/header/HeaderBasic";
import { getBookList } from "~/plugins/apis";
import { mapState } from "vuex";
export default {
  name: "NoteList",
  layout: "basic",
  components: {
    HeaderBasic
  },
  data() {
    return {
      statusTitle: "待确定",
      swipeBtn: "取消预约",
      list: [],
      loading: false,
      finished: false,
      filterOption: {
        tenantId: "",
        hostId: ""
      }
    };
  },
  computed: {
    ...mapState(["user", "token"])
  },
  created() {
    //判断房东或租客发送不同请求
    if (this.user.isHost) {
      this.filterOption.hostId = this.user.id;
    } else {
      this.filterOption.tenantId = this.user.id;
    }
    console.log(this.filterOption);
    getBookList({
      //请求参数filter
      filter: this.filterOption
    }).then(res => {
      this.loading = true;
      this.list = res.data;
      console.log(res);
      console.log(res.data);
      // 加载状态结束
      this.finished = true;
    });
  },
  methods: {
    // getNoteById(id, status) {
    //   this.$router.push({
    //     path: "/subscribe",
    //     query: { reqId: id, reqStatus: status }
    //   });
    //   console.log("获取详情" + id);
    // }
  }
};
</script>

<style lang="scss">
.hk-list {
  padding: 40px 0;
  margin: 0 auto;
  width: 80%;
  font-size: 14px;
  .van-radio {
    margin-bottom: 8px;
  }
}
.goods-card {
  margin: 0;
  background-color: #000;
}
.delete-button {
  height: 100%;
}
.hk_rqMsg {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
