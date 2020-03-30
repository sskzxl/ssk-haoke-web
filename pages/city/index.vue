<template>
  <div class="city-page">
    <van-nav-bar
      fixed=""
      title="城市定位"
      left-arrow
      @click-left="handleClickLeft"
    />
    <!-- 自动定位 -->
    <div class="hk-group">
      <h6>选择城市</h6>
      <div class="hk-geo">
        <i class="icon_geo"></i>
        <span data-mark="location" @click="handleSetCity">{{
          pos.city || "正在定位"
        }}</span>
        <span class="refresh_wrap" data-act="reLocate"
          ><i class="icon_refresh"></i
        ></span>
      </div>
    </div>
    <!-- 热门城市 -->
    <!--     <div class="hk-group hk-hot-city">
      <h6>热门城市</h6>
      <div class="hk-city__list">
        <a href="https://m.lianjia.com/bj/" class="city_item"
          ><span>北京</span></a
        >
        <a href="https://m.lianjia.com/sh/" class="city_item"
          ><span>上海</span></a
        >
        <a href="https://m.lianjia.com/sz/" class="city_item"
          ><span>深圳</span></a
        >
      </div>
    </div> -->
    <!-- 字母选择器 -->
    <div class="hk-group">
      <h6>全部城市（按首字母顺序）</h6>
      <div class="block hk-alphabet">
        <van-row>
          <van-col
            v-for="code in $data._codes"
            :key="code"
            span="4"
            data-act="lookup"
            @click="handleJumpCity(code)"
            >{{ code }}</van-col
          >
        </van-row>
      </div>
    </div>
    <div
      class="hk-group"
      v-for="city in $data._citys"
      :key="city.code"
      :id="city.code"
    >
      <h6>{{ city.code }}</h6>
      <div class="block hk-city__block">
        <van-row>
          <van-col v-for="item in city.list" :key="item" span="8">
            <span @click="handleSelectCity(item)">{{ item }}</span>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import TXMap from "~/plugins/txMap";
import citys from "./citys";
import { utils } from "~/plugins/utils";
export default {
  layout: "basic",
  data() {
    return {
      _citys: citys,
      _codes: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "Q",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z"
      ],
      pos: ""
    };
  },
  created() {
    TXMap.getLocation()
      .then(position => {
        let city = position.city.includes("市") && position.city.slice(0, -1);
        position.city = city;
        this.pos = position;
      })
      .catch(error => {
        // this.$store.commit("setCity", '北京');
        this.$toast(error);
      });
  },
  methods: {
    handleClickLeft() {
      this.$router.back();
    },
    handleSelectCity(city) {
      console.log(this);

      this.$store.commit("setCity", city);
      this.$router.push({
        path: `/resource`,
        query: { city }
      });
    },
    handleSetCity() {
      if (!this.position) {
        return;
      }
      this.$router.push({
        path: `/resource`,
        query: { city: this.position.city }
      });
      this.$store.commit("setCity", this.position.city);
      this.$store.commit("setDistrict", this.position.district);
    },
    handleJumpCity(code) {
      window.scrollTo(
        0,
        utils.offset(document.querySelector(`#${code}`)).top - 40
      );
    }
  }
};
</script>

<style lang="scss">
.hk-geo,
.hk-city__block,
.hk-alphabet,
.hk-city__list {
  background-color: #fff;
  padding: 10px;
}
.hk-group {
  padding: 10px;

  h6 {
    font-size: 15px;
    font-weight: normal;
    line-height: 40px;
    color: #999;
  }
}
.hk-city__block {
  box-sizing: border-box;
  border-radius: 0.125rem;
  text-align: center;

  .van-row {
    padding: 10px 0;
  }

  span {
    display: block;
    padding: 10px 0;
  }
}
.hk-alphabet {
  padding: 20px 0;

  .van-row {
    text-align: center;
  }
  .van-col {
    padding: 10px 0;
  }
}
</style>
