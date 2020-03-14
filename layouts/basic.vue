<template>
  <div class="layout-base">
    <slot name="header"></slot>
    <transition name="page">
      <nuxt class="container" />
    </transition>
    <slot name="footer">
    </slot>
  </div>
</template>

<script>
import Footer from "~/components/Footer";
import { mapState } from "vuex";
export default {
  components: {
    Footer
  },
  computed: {
    ...mapState(['navIndex', 'navs']),
  },
  beforeCreate() {
    if (this.$route && !this.navIndex) {
      this.$store.commit("setNavForPath", this.$route.path);
      this.$nextTick(() => {
        if (this.navs.some((nav) => {
          return nav.path === this.$route.path
        })) {
          this.$store.commit("setTitle", this.navs[this.navIndex].tabTitle);
        }
      });
    }
  },
};
</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #f1f1f1;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  margin: 50px auto 50px;
}
</style>
