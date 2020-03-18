<template>
  <div class="resource">
    <van-list
      class="hk-messages"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ResourceList
        :data="list"
        @filterChange="handleFilterChange"
      ></ResourceList>
    </van-list>
  </div>
</template>

<script>
import ResourceList from "~/components/resource-list";
import { getResources } from "~/plugins/apis";
export default {
  name: "Resources",
  components: {
    ResourceList
  },
  data() {
    return {
      filterType: 1,
      list: [],
      pageNum: 0,
      pageSize: 10,
      loading: false,
      finished: false
    };
  },
  asyncData() {
    /* return getResources({
      filter: "{}",
      pageNum: 1,
      pageSize: 10
    }).then(res => {
      return { list: res.data.records };
    }); */
  },
  methods: {
    onLoad() {
      this.pageNum++;
      console.log('loading')
      getResources({
        filter: "{}",
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        res.data.records.forEach(item => {
          this.list.push(item);
        })
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (res.data.records.length === 0) {
          this.finished = true;
        }
      });
    },
    handleFilterChange(type) {}
  }
};
</script>

<style lang="scss">
.resource {
  background-color: #fff;
  .hk-recommend__list {
    padding: 10px;
  }
}
</style>
