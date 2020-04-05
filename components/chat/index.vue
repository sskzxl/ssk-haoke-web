<template>
  <van-list
    class="hk-messages"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <nuxt-link
      v-for="item in iMUsers"
      :key="item"
      :to="`/chat/${item}?name=玩女士`"
    >
      <van-row class="hk-messages__item">
        <van-col :span="6" style="text-align:center">
          <van-image
            round
            width="3rem"
            height="3rem"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </van-col>
        <van-col :span="14">
          <h4>房东女士 <span>认证房主</span></h4>
          <p>明天能否签约？</p>
        </van-col>
        <van-col :span="4">
          <p>10:53</p>
        </van-col>
      </van-row>
    </nuxt-link>
  </van-list>
</template>

<script>
import { mapState } from "vuex";
import { getUserListByIM } from "~/plugins/apis";
export default {
  name: "Chat",
  data() {
    return {
      iMUsers: [],
      loading: false,
      finished: false
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    onLoad() {
      if (this.user) {
        getUserListByIM(this.user.id).then(res => {
          this.loading = false;
          this.finished = true;
        });
      } else {
        this.loading = false;
        this.finished = true;
      }
    }
  }
};
</script>

<style lang="scss">
.hk-messages__item {
  padding: 6px 0;
  background-color: #fff;
  &:first-child {
    padding-top: 14px;
  }

  h4 {
    font-weight: normal;
    font-size: 18px;
    color: #333;

    span {
      font-size: 12px;
      color: orange;
    }
  }
  p {
    line-height: 30px;
    font-size: 14px;
    color: #999;
  }
}
</style>
