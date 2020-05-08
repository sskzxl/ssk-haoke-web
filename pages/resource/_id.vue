<template>
  <div>
    <van-nav-bar
      fixed=""
      :title="resource.title"
      left-arrow
      @click-left="handleBack"
      @click-right="handleShare"
    >
      <template v-slot:right>
        <van-icon name="share" />
      </template>
    </van-nav-bar>
    <div class="hk-resource-details">
      <van-swipe
        class="hk-details__pic"
        :autoplay="3000"
        indicator-color="white"
      >
        <van-swipe-item
          v-for="(pic, index) in resource.picList"
          :key="pic + index"
        >
          <van-image :src="`${imgUrl}/${pic}`"></van-image>
        </van-swipe-item>
      </van-swipe>
      <div style="background-color: #fff;">
        <h2>{{ resource.title }}</h2>
      </div>
      <p class="hk-details__tags">
        <van-tag v-for="item in resource.tags" :key="item" type="primary">{{
          item
        }}</van-tag>
        <span class="hk-details__time">{{ resource.created }}发布</span>
      </p>
      <div style="padding: 0 10px 10px;">
        <van-row :gutter="20" class="hk-details__info">
          <van-col span="8">
            <h4>{{ resource.rent }}元/月</h4>
            <p>租金</p>
          </van-col>
          <van-col span="8">
            <h4>{{ resource.houseType }}</h4>
            <p>房型</p>
          </van-col>
          <van-col span="8">
            <h4>{{ resource.useArea }}平米</h4>
            <p>面积</p>
          </van-col>
        </van-row>
        <div>
          <van-row :gutter="20" class="hk-details__more">
            <van-col span="12">
              <span>装修：</span>
              <span>{{ $data.$decoration[resource.decoration] }}</span>
            </van-col>
            <van-col span="12">
              <span>楼层：</span>
              <span>{{ resource.floor }}</span>
            </van-col>
            <van-col span="12">
              <span>朝向：</span>
              <span>{{ resource.orientation }}</span>
            </van-col>
            <van-col span="12">
              <span>看房时间：</span>
              <span>{{ resource.time }}</span>
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="hk-details__map">
        <p>小区： {{ resource.address }}</p>
        <div class="map-wrap"></div>
      </div>
      <div class="hk-details__thing">
        <h5>房屋配置</h5>
        <van-row style="text-align: center;">
          <van-col
            span="3"
            v-for="(item, index) in resource.facilities"
            :key="item + index"
          >
            <!--<van-icon name="graphic" />-->
            <van-image :src="`${imgUrl}/icon/${item}`"></van-image>
            <p>{{ $data.$types[Number.parseInt(index)] }}</p>
          </van-col>
        </van-row>
      </div>
      <div class="hk-details__describe">
        <h5>房屋描述</h5>
        <div style="padding: 16px 30px;">
          <ChatUser
            :user="{ name: resource.contact, phone: resource.mobile }"
          ></ChatUser>
          <p class="hk-details__txt">
            {{ resource.houseDesc }}
          </p>
        </div>
      </div>
      <div class="hk-details__recommend">
        <h5>猜您喜欢</h5>
        <ResourceList
          :filter="false"
          showCont="3"
          :data="recommendList"
        ></ResourceList>
      </div>
    </div>
    <div class="hk-details__tools">
      <van-row>
        <van-col span="6">
          <p>
            <van-icon name="star" />
            收藏
          </p>
        </van-col>
        <van-col span="9">
          <p @click="handleConcat">联系房东</p>
        </van-col>
        <van-col span="9">
          <p @click="showReqPopup" :disabled="this.disabledBtn">
            <!-- <nuxt-link
              :to="{ path: '/subscribe', query: { id: this.resource.id } }"
              >预约看房</nuxt-link
            >-->
            预约看房
          </p>
        </van-col>
      </van-row>
      <!--预约弹窗-->
      <van-popup
        v-model="showReq"
        title="预约时间："
        class=".hk_showReq"
        position="bottom"
        round="true"
      >
        <div>
          <van-field
            v-model="startValue"
            @focus="handleStartInputDateTime"
            name="时间"
            label="到访时间："
            right-icon="clock-o"
            :rules="[{ required: true, message: '请选择预约时间' }]"
          />
          <van-field
            v-model="endValue"
            @focus="handleEndInputDateTime"
            name="时间"
            label="离开时间："
            right-icon="clock-o"
            :rules="[{ required: true, message: '请选择预约时间' }]"
          />
        </div>
        <van-button type="info" @click="commitBookMethod">确认</van-button>
        <van-button type="warning" @click="showReq = false">取消</van-button>
      </van-popup>

      <van-popup v-model="showStart" position="bottom">
        <van-datetime-picker
          v-model="commitBook.startTime"
          type="datetime"
          @cancel="handleClose"
          @confirm="confirmStartFn"
          title="请选择预约时间"
        />
      </van-popup>
      <!--时间弹窗-->
      <van-popup v-model="showEnd" position="bottom">
        <van-datetime-picker
          v-model="commitBook.endTime"
          type="datetime"
          :mix-date="startTime"
          @cancel="handleClose"
          @confirm="confirmEndFn"
          title="请选择预约时间"
        />
      </van-popup>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import config from "~/app.config";
import ResourceList from "~/components/resource-list";
import ChatUser from "~/components/chat-user";
import { getResource, commitBooking } from "~/plugins/apis";
import { mapState } from "vuex";
const types = {
  1: "床",
  2: "洗衣机",
  3: "空调",
  4: "衣柜",
  5: "电视",
  6: "冰箱",
  7: "热水器",
  8: "暖气",
  9: "宽带",
  10: "天然气"
};
const decoration = {
  1: "精装",
  2: "简装",
  3: "毛坯"
};
export default {
  layout: "basic",
  components: {
    ResourceList,
    ChatUser
  },
  data() {
    return {
      //按钮禁用
      disabledBtn: false,
      //预约提交框时间
      startValue: this.timeFormat(new Date()), //输入框默认值
      endValue: this.timeFormat(new Date()),
      showEnd: false,
      showStart: false,
      concat: "",
      startTime: new Date(),
      endTime: new Date(),
      disabledFiled: false,
      commitBook: {
        userId: "",
        houseResourcesId: this.$route.query.id,
        startTime: new Date(),
        endTime: new Date(),
        //当前时间
        reqTime: new Date()
      },
      showReq: false,
      $types: types,
      $decoration: decoration,
      recommendList: [],
      resource: {},
      imgUrl: config.sourceUrl.img
    };
  },
  asyncData({ params }) {
    return getResource(params.id).then(res => {
      return { resource: res.data };
    });
  },
  computed: {
    ...mapState(["user", "token"])
  },
  methods: {
    commitBookMethod() {
      this.commitBook.houseResourcesId = this.resource.id;
      this.commitBook.userId = this.user.id;
      console.log(this.commitBook);
      commitBooking(this.commitBook).then(res => {
        //重复预约
        if (10000 == res.resultCode) {
          Toast.fail(res.resultMsg || "请求服务失败");
          this.disabledBtn = true;
          this.showReq = false;
        } else {
          if (0 == res.resultCode) {
            //预约成功
            Toast.success("预约成功！");
            this.disabledBtn = true;
            this.showReq = false;
          }
        }
        console.log(res);
      });
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
    showReqPopup() {
      this.showReq = true;
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
      if (this.$route.query.from) {
        this.$router.push(`/${this.$route.query.from}`);
      } else {
        this.$router.back();
      }
    },
    handleShare() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss">
.hk-resource-details {
  h2 {
    padding: 10px 0;
    margin: 0 10px 10px;
    font-weight: normal;
    font-size: 18px;
  }

  .hk-details__time {
    float: right;
    font-size: 14px;
    color: #999;
  }
}

.hk-details__pic {
  height: 150px;
}

.hk-details__info {
  padding: 16px 0;
  background-color: #fff;
  text-align: center;

  h4 {
    line-height: 30px;
    color: red;
    font-size: 16px;

    & + p {
      color: #999;
      font-size: 14px;
    }
  }
}

.hk-details__more {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 16px 0;
  background-color: #fff;
}

.hk-details__map,
.hk-details__thing,
.hk-details__describe,
.hk-details__recommend {
  margin-top: 20px;
  background-color: #fff;

  & > h5 {
    font-weight: normal;
    font-size: 16px;
    padding: 0 10px;
    line-height: 40px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #eee;
  }
}

.hk-details__map p {
  padding: 10px;
}

.hk-details__thing {
  color: #666;

  .van-row {
    padding: 10px 0;
  }

  .van-col {
    padding: 12px 0;
  }

  .van-icon {
    font-size: 30px;
  }

  p {
    font-size: 14px;
  }
}

.hk-details__recommend {
  .hk-resources {
    padding: 0 10px 20px;
  }
}

.hk-details__tags {
  padding: 10px;
  background-color: #fff;
  overflow: hidden;
  margin-top: 10px;

  .van-tag {
    margin-right: 10px;
  }
}

.hk-details__more {
  font-size: 14px;
  line-height: 30px;

  span:first-child {
    padding-left: 20px;
    color: #999;
  }

  span:last-child {
    color: #333;
  }
}

.hk-details__describe {
  .hk-details__txt {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }
}

.hk-details__tools {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  text-align: center;
  box-shadow: 0 0 10px 0 #ddd;

  p {
    height: 60px;
    line-height: 60px;
  }
  a {
    color: #fff;
  }

  & .van-col:nth-child(2) {
    background-color: #ff8456;
  }
  & .van-col:last-child {
    background-color: #4bbbff;
    color: #fff;
  }

  .van-icon {
    color: #ff0505;
    font-size: 24px;
    vertical-align: sub;
  }
  .hk_showReq {
    width: 100%;
  }
}
</style>
