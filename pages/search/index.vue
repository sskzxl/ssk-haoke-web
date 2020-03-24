<template>
    <div class="hk-search">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
      />
      <div class="hk-search__hot">
        <h6>热搜楼盘</h6>
        <van-row :gutter="10">
          <van-col v-for="hot in hots" :key="hot.id">
            <van-tag plain><nuxt-link :to="`/resource/${hot.id}?from=resource`" class="hk-search__hot-item">{{ hot.name }}</nuxt-link></van-tag>
          </van-col>
        </van-row>
      </div>
    </div>
</template>

<script>
  export default {
    name: "Search",
    layout: 'basic',
    data() {
      return {
        searchValue: '',
        hots: [
          {
            name: '世茂深港国际中心1',
            id: 2011
          },{
            name: '世茂国际中心2',
            id: 2012
          },{
            name: '世茂深港',
            id: 2013
          },{
            name: '世茂深港国际中心3',
            id: 2014
          },{
            name: '世茂深港国际中心6',
            id: 2015
          },
        ]
      }
    }
  }
</script>

<style lang="scss">
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
</style>
