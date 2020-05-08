<template>
  <div class="hk-subscribe-list">
    <HeaderBasic isBack></HeaderBasic>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>
<script>
import HeaderBasic from "~/components/header/HeaderBasic";
import { getBookList } from "~/plugins/apis";
export default {
  name: "NoteList",
  layout: "basic",
  components: {
    HeaderBasic
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      filterOption: {
        tenantId: "",
        hostId: ""
      }
    };
  },
  created() {
    //租客
    this.filterOption.tenantId = this.$route.query.id;
    this.filterOption.hostId = this.$route.query.id;
    console.log("请求参数");
    console.log(this.filterOption);
    getBookList({
      //请求参数filter
      filter: this.filterOption
    }).then(res => {
      console.log("请求参数");
      console.log(res.data);
    });
  },
  methods: {
    onLoad() {}
  }
};
</script>

<style lang="scss">
.hk-list {
  padding: 40px 0;
  margin: 0 auto;
  width: 80%;
  font-size: 14px;
  .van-radio {
    margin-bottom: 8px;
  }
}
</style>
