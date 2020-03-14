<template>
  <van-nav-bar
    fixed
    class="hk-navbar"
    :title="title"
    :left-arrow="isBack"
    @click-left="handleClickLeft"
  >
    <span slot="right" v-if="isShowConcat">联系我们</span>
  </van-nav-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeaderBasic",
  data() {
    return {
      searchValue: ""
    };
  },
  props: {
    isBack: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(["title", "isShowConcat"])
  },
  methods: {
    handleClickLeft() {
      this.$router.back();
    },
    onClickRight() {},
    onSearch() {},
    onCancel() {}
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
