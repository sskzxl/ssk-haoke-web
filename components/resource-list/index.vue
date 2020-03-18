<template>
  <div class="hk-resources">
    <van-row style="position: sticky;top: 50px;text-align: center;" v-if="filter">
      <van-col :span="6">
        <van-dropdown-menu>
          <van-dropdown-item title="地区" ref="">
            <AddressTree @changeFilter="handleFilterChange"></AddressTree>
          </van-dropdown-item>
        </van-dropdown-menu>
      </van-col>
      <van-col :span="6">
        <van-dropdown-menu>
          <van-dropdown-item title="方式" :options="types"/>
        </van-dropdown-menu>
      </van-col>
      <van-col :span="6">
        <van-dropdown-menu>
          <van-dropdown-item title="租金" :options="prices"/>
        </van-dropdown-menu>
      </van-col>
      <van-col :span="6">
        <van-dropdown-menu>
          <van-dropdown-item title="筛选" ref="item">
            <AddressTree @changeFilter="handleFilterChange"></AddressTree>
          </van-dropdown-item>
        </van-dropdown-menu>
      </van-col>
    </van-row>

    <div class="hk-recommend__list">
      <ResourceItem
        v-for="item in resources"
        :key="item.id"
        :data="item"
      ></ResourceItem>
      <p v-if="resources.length === 0 && filterType === 0" style="padding: 20px 0;">暂无推荐</p>
    </div>
  </div>
</template>

<script>
  import ResourceItem from "~/components/resource-item";
  import AddressTree from "~/components/address-tree";

  export default {
    components: {
      ResourceItem,
      AddressTree
    },
    data() {
      return {
        filterType: 0,
        filterOptions: {
          area: "",
          type: ""
        },
        types: [
          {text: "不限", value: 0},
          {text: "整租", value: 1},
          {text: "合租", value: 2}
        ],
        prices: [
          {text: "不限", value: 0},
          {text: "600以下", value: 600},
          {text: "600_1000元", value: 600},
          {text: "1000_1500元", value: 600},
          {text: "1500_2000元", value: 600},
          {text: "2000_3000元", value: 600},
          {text: "3000_5000元", value: 600},
          {text: "5000_8000元", value: 600},
          {text: "8000以上", value: 600}
        ]
      };
    },
    props: {
      data: {
        type: Array,
        default: () => []
      },
      showCount: {
        type: Number,
        default: 0
      },

      filter: {
        type: Boolean,
        required: false,
        default: true,
      },
    },
    computed: {
      resources() {
        if (this.showCount) {
          return this.data.slice(0, this.showCount);
        } else {
          return this.data;
        }
      }
    },
    methods: {
      handleFilter(type) {
        console.log(type === this.filterType);
        if (type === this.filterType) {
          this.filterType = 0;
        } else {
          this.filterType = type;
        }
      },
      handleFilterChange(type) {
      }
    }
  };
</script>

<style lang="scss">
  .hk-recommend__list {
    text-align: center;
  }
</style>
