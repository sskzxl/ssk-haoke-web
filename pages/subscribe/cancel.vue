<template>
  <div class="hk-subscribe-cancel">
    <HeaderBasic isBack></HeaderBasic>
    <div class="hk-cancel">
      <van-radio-group v-model="radio">
        <van-radio name="1">临时有事，另约时间</van-radio>
        <van-radio name="2">已租到合适房间，不需要看房了</van-radio>
        <van-radio name="3">临时变卦，不想看房了</van-radio>
        <van-radio name="4"
          >其他原因
          <van-field></van-field>
        </van-radio>
      </van-radio-group>
      <div class="hk-button--fixed">
        <van-button round block type="info" @click="handleCancel">
          取消预约
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBasic from "~/components/header/HeaderBasic";

export default {
  layout: "basic",
  components: {
    HeaderBasic
  },
  props: {
    resourceId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      radio: ""
    };
  },
  beforeCreate() {
    this.$store.commit("setTitle", "取消预约");
  },
  created() {
    console.log(this.$route);
  },
  methods: {
    handleCancel() {}
  }
};
</script>

<style lang="scss">
.hk-button--fixed {
  position: fixed;
  left: 3%;
  bottom: 20px;
  width: 94%;
}
.hk-cancel {
  padding: 40px 0;
  margin: 0 auto;
  width: 80%;
  font-size: 14px;
  .van-radio {
    margin-bottom: 8px;
  }
}
</style>
