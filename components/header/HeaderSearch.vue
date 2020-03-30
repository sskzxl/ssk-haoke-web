<template>
  <van-nav-bar fixed class="hk-navbar">
    <span slot="left" @click="handleJumpCity">
      {{ position.city || "获取中" }}
      <van-icon name="arrow-down" />
    </span>
    <van-search
      slot="title"
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      @focus="handleFocus"
    />
    <template slot="right">
      <van-icon name="chat-o" size="22" />
    </template>
  </van-nav-bar>
</template>

<script>
import { mapState } from "vuex";
import TXMap from "~/plugins/txMap";
export default {
  name: "HeaderSearch",
  data() {
    return {
      searchValue: ""
    };
  },
  computed: {
    ...mapState(["position"])
  },
  created() {
    if (!this.position.city) {
      TXMap.getLocation()
        .then(position => {
          let city = position.city.includes("市") && position.city.slice(0, -1);
          this.$store.commit("setCity", city);
          this.$store.commit("setDistrict", position.district);
        })
        .catch(error => {
          this.$store.commit("setCity", "北京");
          this.$toast(error);
        });
    }
  },
  methods: {
    handleJumpCity() {
      this.$router.push("/city");
    },
    onClickRight() {},
    onSearch() {},
    onCancel() {},
    handleFocus() {
      this.$router.push({
        path: "/search"
      });
    }
  }
};
</script>

<style lang="scss">
.layout-base .hk-navbar {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10;
  height: 50px;
  line-height: 50px;
  div.nav-center .nav-title {
    margin: 0 10px;
  }
  .van-search {
    padding: 0;
    margin-top: 8px;
  }
}
</style>
