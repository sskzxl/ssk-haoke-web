<template>
  <div class="resource">
      <ResourceList :data="list" @filterChange="handleFilterChange"></ResourceList>
  </div>
</template>

<script>
import ResourceList from '~/components/resource-list'
export default {
  components: {
    ResourceList,
  },
  data() {
    return {
      filterType: 1,
      list: [
        {
          id: 1,
          name: "背景仙洲十分士大夫1",
          tags: ["押一付一", "免押金", "精装"],
          price: 1000,
          info: "4室1厅1卫/120m/南",
          img: "https://img.yzcdn.cn/vant/cat.jpeg"
        },
        {
          id: 1,
          name: "背景仙洲十分士大夫2",
          tags: ["押一付一", "免押金", "精装"],
          price: 1000,
          info: "4室1厅1卫/120m/南",
          img: "https://img.yzcdn.cn/vant/cat.jpeg"
        },{
        id: 1,
          name: "背景仙洲十分士大夫3",
          tags: ["押一付一", "免押金", "精装"],
          price: 1000,
          info: "4室1厅1卫/120m/南",
          img: "https://img.yzcdn.cn/vant/cat.jpeg"
        },
        {
          id: 1,
          name: "背景仙洲十分士大夫4",
          tags: ["押一付一", "免押金", "精装"],
          price: 1000,
          info: "4室1厅1卫/120m/南",
          img: "https://img.yzcdn.cn/vant/cat.jpeg"
        },
        {
          id: 1,
          name: "背景仙洲十分士大夫5",
          tags: ["押一付一", "免押金", "精装"],
          price: 1000,
          info: "4室1厅1卫/120m/南",
          img: "https://img.yzcdn.cn/vant/cat.jpeg"
        },
        {
          id: 1,
          name: "背景仙洲十分士大夫6",
          tags: ["押一付一", "免押金", "精装"],
          price: 1000,
          info: "4室1厅1卫/120m/南",
          img: "https://img.yzcdn.cn/vant/cat.jpeg"
        },
        {
          id: 1,
          name: "背景仙洲十分士大夫7",
          tags: ["押一付一", "免押金", "精装"],
          price: 1000,
          info: "4室1厅1卫/120m/南",
          img: "https://img.yzcdn.cn/vant/cat.jpeg"
        },
        {
          id: 1,
          name: "背景仙洲十分士大夫8",
          tags: ["押一付一", "免押金", "精装"],
          price: 1000,
          info: "4室1厅1卫/120m/南",
          img: "https://img.yzcdn.cn/vant/cat.jpeg"
        },
        {
          id: 1,
          name: "背景仙洲十分士大夫9",
          tags: ["押一付一", "免押金", "精装"],
          price: 1000,
          info: "4室1厅1卫/120m/南",
          img: "https://img.yzcdn.cn/vant/cat.jpeg"
        },
        {
          id: 1,
          name: "背景仙洲十分士大夫",
          tags: ["押一付一", "免押金", "精装"],
          price: 1000,
          info: "4室1厅1卫/120m/南",
          img: "https://img.yzcdn.cn/vant/cat.jpeg"
        },
      ]
    }
  },
  methods: {
    handleFilterChange(type) {}
  }
}
</script>

<style lang="scss">
.resource {
  background-color: #fff;
  .hk-recommend__list {
    padding: 10px;
  }
}
</style>
