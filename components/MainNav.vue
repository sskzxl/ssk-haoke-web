<template>
  <div class="hk-nav">
    <van-row :gutter="10">
      <van-col :span="6" @click="handleJump(1)">
        <van-icon name="wap-home-o" size="40px" color="#51a8ff" />
        <h5>整租</h5>
      </van-col>
      <van-col :span="6" @click="handleJump(2)">
        <van-icon name="hotel-o" size="40px" color="#5aa218" />
        <h5>合租</h5>
      </van-col>
      <van-col :span="6">
        <nuxt-link to="/map">
          <van-icon name="location-o" size="40px" color="#ff0404" />
          <h5>地图找房</h5>
        </nuxt-link>
      </van-col>
      <van-col :span="6">
        <nuxt-link to="/user/publish">
          <van-icon name="search" size="40px" color="#ffc00d" />
          <h5>去出租</h5>
        </nuxt-link>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleJump(type) {
      this.$store.commit("setNav", 1);
      this.$router.push({
        path: "/resource",
        query: {
          type
        }
      });
    }
  }
};
</script>

<style lang="scss">
.hk-nav {
  padding: 20px 10px;
  background-color: #fff;
  text-align: center;
}
</style>
