<template>
  <div class="hk-subscribe">
    <van-nav-bar
      fixed
      title="预约看房"
      left-arrow
      @click-left="handleBack"
      @click-right="handleList"
    >
      <template v-slot:right>
        <span>预约列表</span>
      </template>
    </van-nav-bar>
    <p style="padding: 30px 10px 20px">确认信息</p>
    <ResourceItem
      class="hk-subscribe__resource"
      :data="resource"
    ></ResourceItem>
    <div>
      <van-form style="width: 100%" @submit="handleSubmit">
        <van-field
          name="地址"
          label="地址"
          :placeholder="resource.address"
          :disabled="this.disabledFiled"
        />
        <van-field
          v-model="startValue"
          @focus="handleStartInputDateTime"
          name="时间"
          label="到访时间"
          readonly
          :disabled="this.disabledFiled"
          right-icon="clock-o"
        />
        <van-field
          v-model="endValue"
          @focus="handleEndInputDateTime"
          name="时间"
          label="离开时间"
          readonly
          :disabled="this.disabledFiled"
          right-icon="clock-o"
        />
        <van-field
          v-model="concat"
          name="联系方式"
          label="联系方式"
          placeholder="联系方式"
          :disabled="this.disabledFiled"
        />
      </van-form>
      <p class="hk-subscribe__tip">
        <span>（有问题请联系房东）</span>
        <van-button @click="handleConcat">联系房东</van-button>
      </p>
      <div class="hk-button--fixed">
        <van-button
          :disabled="this.disabledBtn"
          round
          block
          :type="this.btnType"
          native-type="submit"
          @click="handleSubmit"
        >
          {{ this.submitValue }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ResourceItem from "~/components/resource-item";
import {
  getBookListByReqId,
  getBookingPage,
  commitBooking
} from "~/plugins/apis";
import { Toast } from "vant";
export default {
  layout: "basic",
  components: {
    ResourceItem
  },
  data() {
    return {
      reqStatus: "",
      btnType: "info",
      submitValue: "取消预约",
      startValue: this.timeFormat(new Date()), //输入框默认值
      endValue: this.timeFormat(new Date()),
      concat: "",
      startTime: new Date(),
      endTime: new Date(),
      //详情页字段不可用
      disabledFiled: false,
      showEnd: false,
      showStart: false,
      //按钮禁用
      disabledBtn: false,
      //预览页对象
      resource: {
        address: "",
        id: 0,
        name: "",
        tags: 0,
        price: 0,
        info: "",
        img: "",
        contactId: "",
        concat: ""
      },
      //预约提交对象
      commitBook: {
        userId: "",
        houseResourcesId: this.$route.query.id,
        startTime: new Date(),
        endTime: new Date(),
        //当前时间
        reqTime: new Date()
      },
      //时间选择器
      currentTime: new Date(), // 开始时间不能超过当前时间
      // startTime: new Date(), // 开始时间
      // endTime: new Date(), // 结束时间
      datePicker: "", // 用于判断哪个选择器的显示与隐藏
      isPopShow: false // 弹出层隐藏与显示
    };
  },
  computed: {
    ...mapState(["token", "user"])
  },
  created() {
    if (this.$route.query.reqId) {
      getBookListByReqId(this.$route.query.reqId).then(res => {
        //获取预约详情，渲染页面
        this.resource = res.data.houseData;
        this.concat = res.data.phone;
        this.disabledFiled = true;

        //根据状态判断按钮信息
        if (0 == this.$route.query.reqStatus) {
        }
      });
    }
  },
  methods: {
    async handleSubmit() {
      //从全部获取user对象
      if (!this.user) {
        console.log("获取不到user");
        return;
      }
      this.commitBook.userId = this.user.id;
      //待确认状态->可提前取消
      if (this.reqStatus && 0 == this.reqStatus) {
      }
    },
    timeFormat(time) {
      console.log(time);
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let hour = time.getHours();
      let minute = time.getMinutes();
      let second = time.getSeconds();

      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      hour = hour < 10 ? "0" + hour : hour;
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        ":" +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    formatter(type, value) {
      // 格式化选择器日期
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } else if (type === "hour") {
        return `${value}时`;
      } else if (type === "minute") {
        return `${value}分`;
      }
      return value;
    },
    handleConcat() {
      if (!this.$store.state.token) {
        // 判断是否登陆
        this.$router.push({
          path: "/login",
          query: { redirect: this.$route.path }
        });
      } else if (this.resource.contactId) {
        const { contactId, contact } = this.resource;

        // 跳转到聊天页面
        this.$router.push({
          path: `/chat/${contactId}`,
          query: { contact }
        });
      } else {
        this.$total.error("缺少联系人id");
      }
    },
    handleBack() {
      this.$router.back();
    },
    handleStartInputDateTime() {
      this.showStart = true;
    },
    handleEndInputDateTime() {
      this.showEnd = true;
    },
    handleClose() {
      this.showStart = false;
      this.showEnd = false;
    },
    confirmStartFn() {
      console.log(this.startTime);
      this.startValue = this.timeFormat(this.commitBook.startTime);
      this.showStart = false;
    },
    confirmEndFn() {
      this.endValue = this.timeFormat(this.commitBook.endTime);
      this.showEnd = false;
    },
    handleList() {
      this.$router.push({
        path: "/message",
        query: { id: this.user.id }
      });
    }
  }
};
</script>

<style lang="scss">
.hk-subscribe__resource {
  padding: 20px 0;
}

.hk-subscribe__tip {
  overflow: hidden;
  margin: 20px 0;
  color: #999;
  line-height: 40px;
  font-size: 14px;

  .van-button {
    float: right;
  }
}

.hk-button--fixed {
  position: fixed;
  left: 3%;
  bottom: 20px;
  width: 94%;
}

.hk-subscribe__tip {
  padding: 0 10px;
}
</style>
