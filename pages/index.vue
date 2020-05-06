<template>
  <div class="home">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="banner in banners" :key="banner.original">
        <van-image :src="banner.original"></van-image>
      </van-swipe-item>
    </van-swipe>
    <main-nav></main-nav>
    <!--<div class="hk-module hk-group">-->
      <!--<h4>-->
        <!--租房小组-->
        <!--<router-link to="/resource">更多</router-link>-->
      <!--</h4>-->
      <!--<div class="hk-module__inner">-->
        <!--<van-row :gutter="10">-->
          <!--<van-col :span="12">-->
            <!--<div class="hk-group__inner">-->
              <!--<a>-->
                <!--<img src="https://img.yzcdn.cn/vant/cat.jpeg" />-->
                <!--<div class="hk-group__info">-->
                  <!--<h5>家住回龙观</h5>-->
                  <!--<p>归属的感觉</p>-->
                <!--</div>-->
              <!--</a>-->
            <!--</div>-->
          <!--</van-col>-->
          <!--<van-col :span="12">-->
            <!--<div class="hk-group__inner">-->
              <!--<a>-->
                <!--<img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="房间" />-->
                <!--<div class="hk-group__info">-->
                  <!--<h5>家住回龙观</h5>-->
                  <!--<p>归属的感觉</p>-->
                <!--</div>-->
              <!--</a>-->
            <!--</div>-->
          <!--</van-col>-->
          <!--<van-col :span="12">-->
            <!--<div class="hk-group__inner">-->
              <!--<a>-->
                <!--<img src="https://img.yzcdn.cn/vant/cat.jpeg" />-->
                <!--<div class="hk-group__info">-->
                  <!--<h5>家住回龙观</h5>-->
                  <!--<p>归属的感觉</p>-->
                <!--</div>-->
              <!--</a>-->
            <!--</div>-->
          <!--</van-col>-->
          <!--<van-col :span="12">-->
            <!--<div class="hk-group__inner">-->
              <!--<a>-->
                <!--<img src="https://img.yzcdn.cn/vant/cat.jpeg" />-->
                <!--<div class="hk-group__info">-->
                  <!--<h5>家住回龙观</h5>-->
                  <!--<p>归属的感觉</p>-->
                <!--</div>-->
              <!--</a>-->
            <!--</div>-->
          <!--</van-col>-->
        <!--</van-row>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="hk-module hk-news">-->
      <!--<h4>租房咨询</h4>-->
      <!--<div class="hk-module__inner">-->
        <!--<a href="#">-->
          <!--<van-row gutter="10" class="hk-news__item">-->
            <!--<van-col :span="6">-->
              <!--<img src="https://img.yzcdn.cn/vant/cat.jpeg" />-->
            <!--</van-col>-->
            <!--<van-col :span="18">-->
              <!--<h5>背景仙洲十分士大夫</h5>-->
              <!--<div class="hk-news-tag">-->
                <!--<span>限购</span>-->
                <!--<span>租房</span>-->
              <!--</div>-->
            <!--</van-col>-->
          <!--</van-row>-->
        <!--</a>-->
        <!--<a href="#">-->
          <!--<van-row gutter="10" class="hk-news__item">-->
            <!--<van-col :span="6">-->
              <!--<img src="https://img.yzcdn.cn/vant/cat.jpeg" />-->
            <!--</van-col>-->
            <!--<van-col :span="18">-->
              <!--<h5>背景仙洲十分士大夫</h5>-->
              <!--<div class="hk-news-tag">-->
                <!--<span>限购</span>-->
                <!--<span>租房</span>-->
              <!--</div>-->
            <!--</van-col>-->
          <!--</van-row>-->
        <!--</a>-->
      <!--</div>-->
    <!--</div>-->
    <div class="hk-module hk-recommend">
      <h4>推荐房源</h4>
      <div class="hk-module__inner">
        <ResourceList :showCount="4" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MainNav from "~/components/MainNav";
import ResourceList from "~/components/resource-list";
import { getResources, getCityList } from "~/plugins/apis";

export default {
  components: {
    MainNav,
    ResourceList
  },
//  asyncData() {
//    return getBanners().then(res => {
//      return { banners: res.data.list };
//    });
//  },
  computed: {
    ...mapState(["citys", "position", "token", "user"])
  },
  data() {
    return {
      cityList: [],
      banners: [],
    };
  },
  created() {
    if (this.token && !this.user) {
      this.getUserInfo();
    }
  },
  mounted() {},
  methods: {
    ...mapActions(["getUserInfo"])
  }
};
</script>

<style lang="scss">
@import "../assets/module.scss";

.hk-nav {
  margin-bottom: 20px;
}

.hk-group {
  img {
    float: right;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .hk-module__inner {
    background-color: transparent;
  }
}

.hk-group__inner {
  padding: 10px;
  margin-bottom: 10px;
  height: 75px;
  background-color: #fff;

  &:last h5 {
    font-weight: normal;
    font-size: 16px;
    color: #333;
  }

  p {
    line-height: 26px;
    font-size: 12px;
    color: #666;
  }
}

.hk-news {
  position: relative;

  img {
    width: 100%;
  }
}

.hk-news__item {
  padding: 10px 0;
  border-bottom: 1px solid #efefef;

  &:last-child {
    border: 0;
  }

  h5 {
    font-size: 15px;
    color: #333;
    font-weight: normal;
  }
}

.hk-news-tag {
  margin-top: 14px;
  font-size: 0;
  color: #666;

  span {
    margin-right: 8px;
    font-size: 12px;
    padding: 2px 4px;
    border: 1px solid #ddd;
  }
}

.hk-recommend {
  .hk-recommend__list {
    min-height: 50vh;
  }

  .hk-module__inner {
    padding: 0;
  }

  .hk-select {
    height: 24px;
    line-height: 24px;
    font-size: 14px;

    .van-icon {
      vertical-align: middle;
    }
  }

  .hk-recommend__list {
    padding: 10px;
  }
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
</style>
