<template>
  <van-nav-bar fixed class="hk-navbar">
    <span slot="left">
      北京
      <van-icon name="arrow-down" />
    </span>
    <van-search
      slot="title"
      v-model="searchValue"
      placeholder="请输入搜索关键词"
    />
    <template slot="right">
      <van-icon name="chat-o" size="22" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: "HeaderSearch",
  data() {
    return {
      searchValue: ""
    };
  },
  methods: {
    onClickLeft() {},
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
