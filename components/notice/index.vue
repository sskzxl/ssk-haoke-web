<template>
  <div class="hk-subscribe-list">
    <HeaderBasic isBack></HeaderBasic>
    <!--房东或租客的状态语-->
    <van-panel
      :status="
        user.isHost == TATENT
          ? tanentMap.get(item.status).statusText
          : hostMap.get(item.status).statusText
      "
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="hk_rqMsg">{{ item.msg }}</div>
      <template #footer>
        <van-button
          size="small"
          :type="isContains(dangerColor, item.status) ? 'danger' : 'info'"
          @click="
            handleStatus(
              item.status,
              user.isHost == HOST
                ? hostMap.get(item.status).confirmStatus
                  ? hostMap.get(item.status).confirmStatus
                  : hostMap.get(item.status).nextStatus
                : tanentMap.get(item.status).nextStatus,
              item.id
            )
          "
        >
          {{
            //按钮文本
            user.isHost == HOST
              ? item.status == 0
                ? hostMap.get(item.status).confirmButton
                : hostMap.get(item.status).button
              : tanentMap.get(item.status).button
          }}
        </van-button>
        <!--如果是房东的待确认多一个按钮-->
        <van-button
          v-if="user.isHost == HOST && item.status == 0"
          size="small"
          :type="isContains(infoColor, item.status) ? 'info' : 'danger'"
          @click="
            handleStatus(
              item.status,
              hostMap.get(item.status).cancelStatus,
              item.id
            )
          "
        >
          {{
            //按钮文本
            hostMap.get(item.status).cancelButton
          }}
        </van-button>
      </template>
    </van-panel>
  </div>
</template>
<script>
import HeaderBasic from "~/components/header/HeaderBasic";
import { getBookList, modifyBookStatus } from "~/plugins/apis";
import { mapState } from "vuex";

export default {
  name: "NoteList",
  layout: "basic",
  components: {
    HeaderBasic
  },

  data() {
    return {
      HOST: 0,
      TATENT: 1,
      statusTitle: "待确定",
      swipeBtn: "取消预约",
      list: [],
      loading: false,
      finished: false,
      filterOption: {
        tenantId: "",
        hostId: "",
        id: ""
      },
      modify: {
        reqStatus: ""
      },
      tanentMap: new Map([
        ["0", { statusText: "待确认", button: "取消预约", nextStatus: 3 }],
        ["1", { statusText: "已通过", button: "已通过" }],
        ["2", { statusText: "已拒绝", button: "已拒绝" }],
        ["3", { statusText: "已取消", button: "已取消" }],
        ["4", { statusText: "已看完", button: "已看完" }]
      ]),
      hostMap: new Map([
        [
          "0",
          {
            statusText: "预约请求",
            confirmButton: "通过",
            cancelButton: "拒绝",
            confirmStatus: 1, //已通过
            cancelStatus: 2 //已拒绝
          }
        ],
        ["1", { statusText: "预约请求", button: "已通过", nextStatus: 4 }], //已看完
        ["2", { statusText: "预约请求", button: "已拒绝" }],
        ["3", { statusText: "取消看房", button: "已取消" }],
        ["4", { statusText: "预约请求", button: "已看完" }]
      ]),
      infoColor: ["0", "1", "4"],
      dangerColor: ["2", "3"]
    };
  },
  computed: {
    ...mapState(["user", "token"])
  },
  created() {
    //判断房东或租客发送不同请求
    if (this.user.isHost == 0) {
      //是房东
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
      console.log(res.data);
      // 加载状态结束
      this.finished = true;
    });
  },
  methods: {
    //修改状态
    //currentStatus当前状态，nextStatus修改的状态 ， id请求表id  ，修改完的按钮文本
    handleStatus(currentStatus, nextStatus, id) {
      console.log(
        " currentStatus:" +
          currentStatus +
          "  nextStatus:" +
          nextStatus +
          "  id:" +
          id +
          "  当前用户类别" +
          this.user.isHost
      );
      this.modify.id = id;

      if (nextStatus) {
        this.modify.reqStatus = nextStatus;
        modifyBookStatus(this.modify).then(res => {
          console.log("状态 " + currentStatus + " 已修改为 " + nextStatus);
          //刷新页面
          getBookList({
            //请求参数filter
            filter: this.filterOption
          }).then(res => {
            this.loading = true;
            this.list = res.data;
            console.log(res.data);
            // 加载状态结束
            this.finished = true;
          });
        });
      } else {
        console.log("无需操作");
      }
    },
    isContains(arr, value) {
      for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
          return true;
        }
      }
      return false;
    }
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
