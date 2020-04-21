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
      :to="`/chat/${item.to_user}?contact=${item.to_username}`"
    >
      <van-row class="hk-messages__item">
        <van-col :span="6" style="text-align:center">
          <van-image
            round
            width="3rem"
            height="3rem"
            :src="item.avatar"
          />
        </van-col>
        <van-col :span="14">
          <h4>{{item.to_username}} <span>认证房主</span></h4>
          <!-- <p>明天能否签约？</p> -->
        </van-col>
        <van-col :span="4">
          <!-- <p>10:53</p> -->
        </van-col>
      </van-row>
    </nuxt-link>
  </van-list>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
    ...mapState(["user", "token"])
  },
  mounted() {
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    onLoad() {
      this.getUserInfo()
        .then(res => {
          res && getUserListByIM(res.id).then(res => {
            this.loading = false;
            this.finished = true;
            this.iMUsers = res.data;
          });
        })
      if (this.token) {
      } else {
        this.loading = false;
        this.finished = true;
        this.$router.push(`/login?redirect=${this.$route.path}`);
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
    margin-top: 6px;
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
