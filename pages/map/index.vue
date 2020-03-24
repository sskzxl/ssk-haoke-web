<template>
  <div class="map">
    <van-nav-bar
      fixed=""
      :title="title"
      left-arrow
      @click-left="handleBack"
      @click-right="handleShare"
    />
    <div id="Map"></div>
  </div>
</template>

<script>

  import config from "~/app.config";
  import txMap from "~/plugins/txMap";

  export default {
    layout: "basic",
    name: "Map",
    head: {
      script: [
        `https://map.qq.com/api/js?v=2.exp&key=${config.txMapKey}`
      ]
    },
    components: {},
    data() {
      return {
        title: '地图找房',
        zoom: 10,
      }
    },
    mounted() {
      txMap.drawOverlay({
        containerId: 'Map',
        callback: this.handleDile.bind(this)
      })
    },
    methods: {
      handleDile(bounds, zoom) {
        if (this.lastZoom >= 13 && zoom < 13) { // 从第二层缩小回到第一层
          this.getData(this.districtUrl)
        } else if (this.lastZoom < 13 && zoom >= 13) { // 从第一层方法到第二层
          this.getData(this.bizcircleUrl)
        }
        this.lastZoom = zoom
      },
      handleBack() {
        this.$router.back();
      },
      handleShare() {
      },
    }
  }
</script>

<style>
</style>
