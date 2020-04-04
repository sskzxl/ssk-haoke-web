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
let histryData = []
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
    txMap.getLocation().then(res => {
      this.getHouseByMap(res);
    });
  },
  methods: {
    getHouseByMap(res) {
      getHouseByMap({
        lat: res.lat,
        lng: res.lng,
        zoom: this.lastZoom,
      }).then(resource => {
        histryData = histryData.concat(resource.data.list)
        txMap.drawOverlay({
          lat: res.lat,
          lng: res.lng,
          containerId: "Map",
          zoomControl: true,
          zoomControlOptions: {
            position: 9,
          },
          data: resource.data.list || [],
          callback: this.handleDile.bind(this)
        });
      });
    },
    handleDile(bounds, zoom) {
      this.getHouseByMap({lat: bounds.lat.minY, lng: bounds.lng.minX, zoom});
      this.lastZoom = zoom;
    },
    handleBack() {
      this.$router.push("/resource");
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
