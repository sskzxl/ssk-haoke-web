<template>
  <div class="map">
    <van-nav-bar
      fixed=""
      :title="title"
      left-arrow
      @click-left="handleBack"
      @click-right="handleShare"
    />
    <div id="Map" ref="MapWrap"></div>
  </div>
</template>

<script>
import config from "~/app.config";
import txMap from "~/plugins/txMap";
import { getHouseByMap } from "~/plugins/apis";
export default {
  layout: "basic",
  name: "Map",
  components: {},
  data() {
    return {
      title: "地图找房",
      lastZoom: 10
    };
  },
  mounted() {
    this.$refs.MapWrap.style.height = window.innerHeight - 51 + "px";
    txMap.getLocation()
      .then(res => {
        getHouseByMap({
          lat: res.lat,
          lng: res.lng,
          zoom: this.lastZoom
        }).then(resource => {
          txMap.drawOverlay({
            lat: res.lat,
            lng: res.lng,
            containerId: "Map",
            data: resource.data.list/* [
              {
                TypeId: "401",
                name: "福田",
                latitude: "22.529945797603",
                longitude: "114.06574904891",
                house_count: 17
              },
            ] */,
            callback: this.handleDile.bind(this)
          });
        });
      });

  },
  methods: {
    getHouseByMap() {},
    handleDile(bounds, zoom) {
      if (this.lastZoom >= 13 && zoom < 13) {
        // 从第二层缩小回到第一层
        this.getHouseByMap(this.districtUrl);
      } else if (this.lastZoom < 13 && zoom >= 13) {
        // 从第一层方法到第二层
        this.getHouseByMap(this.bizcircleUrl);
      }
      this.lastZoom = zoom;
    },
    handleBack() {
      this.$router.back();
    },
    handleShare() {}
  }
};
</script>

<style lang="scss">
.map {
  margin-bottom: 0;
}
.my-overlay {
  position: absolute;
  width: 60px;
  height: 46px;
  background-color: #0778dc;
  padding: 3px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  box-sizing: border-box;
  box-shadow: 2px 10px 20px 0 rgba(0, 0, 0, 0.2);
}
.my-overlay::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border-top: 7px solid #0778dc;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  position: absolute;
  bottom: -7px;
  left: 26px;
}
.my-overlay span {
  font-size: 10px;
  font-weight: normal;
  color: #999;
}
.my-overlay .count {
  border-radius: 3px 3px 0 0;
  color: #0778dc;
  background: #fff;
}
.my-overlay .name {
  color: #fff;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
