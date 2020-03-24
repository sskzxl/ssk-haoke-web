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
        :data="resources"
        @filter-change="handleFilterChange"
      ></ResourceList>
    </van-list>
  </div>
</template>

<script>
  import ResourceList from "~/components/resource-list";
  import {getResources} from "~/plugins/apis";

  export default {
    name: "Resources",
    components: {
      ResourceList
    },
    data() {
      return {
        filterType: 1,
        filterOptions: {},
        resources: [],
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
      getResources(params) {
        getResources(params).then(({data}) => {
          console.log(data)
          // this.resources = data ? data.records : [];
          data.records.forEach(item => {
            this.resources.push(item);
          });
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (data.records.length === 0) {
            this.finished = true;
          }
        });
      },
      onLoad() {
        this.pageNum++;
        this.getResources({
          filter: JSON.stringify(this.filterOptions),
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })/*.then(res => {

        });*/
      },
      handleFilterChange(filterOptions) {
        if (filterOptions.rent) {
          let params = {upPrice: '', lowPrice: ''};
          if (filterOptions.rent.includes('-')) {
            params.upPrice = filterOptions.rent.slice(1);
          }
          if (filterOptions.rent.includes('+')) {
            params.lowPrice = filterOptions.rent.slice(1)
          }
          if (filterOptions.rent.includes('_')) {
            params.lowPrice = filterOptions.rent.split('_')[0];
            params.upPrice = filterOptions.rent.split('_')[1];
          }
          filterOptions.rent = params;
        }
        this.pageNum = 0;
        // this.filterOptions = Object.assign({}, this.filterOptions, filterOptions);
        console.log(JSON.stringify(filterOptions))
        console.log(Object.assign({}, this.filterOptions, filterOptions))
        this.resources = [];
        this.getResources({
          filter: `${JSON.stringify(filterOptions)}`,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
      }
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
