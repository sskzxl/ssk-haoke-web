<template>
  <div class="hk-subscribe">
    <van-nav-bar fixed title="title" left-arrow @click-left="handleBack" @click-right="handleCancle">
      <template v-slot:right>
        <span>取消预约</span>
      </template>
    </van-nav-bar>
    <p style="padding: 30px 10px 20px">房源信息</p>
    <ResourceItem class="hk-subscribe__resource" :data="resource"></ResourceItem>
    <div>
      <van-form style="width: 100%" @submit="handleSubmit">
        <van-field
          v-model="address"
          name="地址"
          label="地址"
          placeholder="地址"
          :rules="[{ required: true, message: ' ' }]"
        />
        <van-field
          v-model="datetime"
          @focus="handleInputDateTime"
          name="时间"
          label="预约时间"
          readonly
          right-icon="clock-o"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="concat"
          name="联系方式"
          label="联系方式"
          placeholder="联系方式"
          :rules="[{ required: true, message: '请填写联系方式' }]"
        />
      </van-form>
      <p class="hk-subscribe__tip">
        <span>（预约前请与房东确认时间）</span>
        <van-button>联系房东</van-button>
      </p>
      <div class="hk-button--fixed">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </div>
    <van-popup
      v-model="visibleDateTime"
      position="bottom"
    >
      <van-datetime-picker
        v-model="datetime"
        type="datetime"
        @cancel="handleClose"
        @confirm="handleConfirmDateTime"
      />
    </van-popup>

  </div>
</template>

<script>
  import ResourceItem from "~/components/resource-item"

  export default {
    layout: 'basic',
    components: {
      ResourceItem,
    },
    data() {
      return {
        concat: '',
        datetime: '',
        address: '',
        visibleDateTime: false,
        resource: {
          id: 1,
          name: "背景仙洲十分士大夫1",
          tags: ["押一付一", "免押金", "精装"],
          price: 1000,
          info: "4室1厅1卫/120m/南",
          img: "https://img.yzcdn.cn/vant/cat.jpeg"
        },
      }
    },
    created() {
      console.log(this.$route)
    },
    methods: {
      handleBack() {
        this.$router.back()
      },
      handleInputDateTime() {
        this.visibleDateTime = true
      },
      handleClose() {
        this.visibleDateTime = false
      },
      handleConfirmDateTime() {
        this.visibleDateTime = false
      },
      handleCancle() {
        this.$router.push('/subscribe/cancel')
      },
      handleSubmit() {}
    }
  }
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
