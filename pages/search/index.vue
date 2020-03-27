<template>
  <div class="hk-search">
    <van-row>
      <van-col :span="20">
        <van-search
          v-model="searchValue"
          placeholder="请输入搜索关键词"
          @input="handleInput"
        />
      </van-col>
      <van-col :span="4" style="text-align: center">
        <nuxt-link to="/resource" style="line-height: 50px;">取消</nuxt-link>
      </van-col>
    </van-row>
    <div class="hk-search__list" v-show="searchResult.length">
      <div
        class="hk-search__list-item"
        v-for="item in searchResult"
        :key="item.id"
      >
        <nuxt-link :to="`/resource/${item.id}`">
          <van-row>
            <van-col :span="20">
              <p class="hk-search__title" v-html="item.title"></p>
              <p class="hk-search__address">
                汕头市濠江区享信息
              </p>
            </van-col>
            <van-col :span="4">
              <span class="hk-search__rent">{{ item.rent }}/㎡</span>
            </van-col>
          </van-row>
        </nuxt-link>
      </div>
    </div>
    <div class="hk-search__hot" v-show="hotSearch.length">
      <h6>别人热搜</h6>
      <van-row :gutter="10">
        <van-col v-for="hot in hotSearch" :key="hot.id">
          <van-tag plain @click="handleHotSearch(hot)" >{{ hot }}</van-tag>
        </van-col>
      </van-row>
    </div>
    <div class="hk-search__hot" v-show="false">
      <h6>热搜楼盘</h6>
      <van-row :gutter="10">
        <van-col v-for="hot in hots" :key="hot.id">
          <van-tag plain
            ><nuxt-link
              :to="`/resource/${hot.id}?from=resource`"
              class="hk-search__hot-item"
              >{{ hot.name }}</nuxt-link
            ></van-tag
          >
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getSearch } from "~/plugins/apis";

let _throttle = () => {};
export default {
  name: "Search",
  layout: "basic",
  data() {
    return {
      searchValue: "",
      searchResult: [],
      hotSearch: [],
      hots: [
        {
          name: "世茂深港国际中心1",
          id: 2011
        },
        {
          name: "世茂国际中心2",
          id: 2012
        },
        {
          name: "世茂深港",
          id: 2013
        },
        {
          name: "世茂深港国际中心3",
          id: 2014
        },
        {
          name: "世茂深港国际中心6",
          id: 2015
        }
      ]
    };
  },
  created() {
    _throttle = this._throttle(this.input, 300);
  },
  methods: {
    input(val) {
      getSearch(val).then(res => {
        this.searchResult = res.data.list;
        if (this.searchResult.length === 0) {
          this.hotSearch = res.data.hotWord;
        }
      });
    },
    handleInput(val) {
      console.log(_throttle);
      _throttle(val);
    },
    handleHotSearch(keyword) {
      this.searchValue = keyword;
      this.handleInput(keyword);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/mixin.scss";

.hk-search {
  margin: 10px 0;
  .van-search {
    margin: 0 10px;
  }
}
.hk-search__hot {
  padding: 10px;
  margin-top: 20px;
  background-color: #fff;

  h6 {
    margin-bottom: 20px;
    font-weight: normal;
    color: #999;
    font-size: 16px;
  }

  .van-col {
    margin-bottom: 10px;
  }
}
.hk-search__hot-item {
  font-size: 14px;
}
.hk-search__list {
  margin-top: 14px;
  padding: 10px;
  background-color: #fff;
  line-height: 34px;

  p {
    @include textOver(75vw);
    vertical-align: top;
  }
  .hk-search__address {
    font-size: 14px;
    line-height: 1;
  }
}
.hk-search__rent {
  float: right;
  font-size: 12px;
  color: #999;
}
.hk-search__list em {
  font-style: normal;
  font-weight: bold;
  color: red;
}
</style>
