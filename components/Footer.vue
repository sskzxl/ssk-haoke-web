<template>
  <van-tabbar fixed v-model="active" @change="handleChange">
    <van-tabbar-item
      :icon="item.icon"
      v-for="item in navs"
      :key="item.tabTitle"
    >
      {{ item.tabTitle }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    navs() {
      return this.$store.state.navs;
    },
    active: {
      get() {
        return this.$store.state.navIndex;
      },
      set(value) {
        this.$store.commit("setNav", value);
        this.$store.commit("setTitle", this.navs[value].tabTitle);
      }
    }
  },
  methods: {
    handleChange: function(index) {
      this.$router.push({ path: this.navs[index].path });
    }
  }
};
</script>

<style lang="scss">
.layout-base {
  .nut-tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
