<template>
  <div class="hk-resources">
    <van-row
      style="position: sticky;top: 50px;text-align: center;"
      v-if="filter"
    >
      <van-col :span="8">
        <van-dropdown-menu close-on-click-outside>
          <van-dropdown-item title="地区" ref="address">
            <AddressTree
              :addressList="filterAddress"
              @filter-change="handleFilterChange"
            >
            </AddressTree>
          </van-dropdown-item>
        </van-dropdown-menu>
      </van-col>
      <van-col :span="8">
        <van-dropdown-menu>
          <van-dropdown-item
            title="方式"
            :options="types"
            v-model="filterOptions.rentMethod"
            @change="handleRentMethodChange"
          />
        </van-dropdown-menu>
      </van-col>
      <van-col :span="8">
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="rent"
            title="租金"
            :options="prices"
            @change="handleRentChange"
          />
        </van-dropdown-menu>
      </van-col>
      <van-col :span="6" v-if="false">
        <van-dropdown-menu>
          <van-dropdown-item title="筛选" ref="item">
            <AddressTree @changeFilter="handleFilterChange"> </AddressTree>
          </van-dropdown-item>
        </van-dropdown-menu>
      </van-col>
    </van-row>

    <div class="hk-recommend__list">
      <van-list
        class="hk-messages"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ResourceItem
          v-for="item in resources"
          :key="item.id"
          :data="item"
        ></ResourceItem>
        <!--        <p v-if="resources.length === 0 && filterType === 0" style="padding: 20px 0;">暂无推荐</p>-->
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ResourceItem from "~/components/resource-item";
import AddressTree from "~/components/address-tree";
import { getResources } from "~/plugins/apis";

export default {
  components: {
    ResourceItem,
    AddressTree
  },
  data() {
    return {
      loading: false,
      finished: false,
      pageNum: 1,
      pageSize: 10,
      resources: [],
      filterType: 0,
      rent: {},
      filterOptions: {
        address: "",
        upPrice: "",
        lowPrice: "",
        rentMethod: 0
      },
      types: [
        { text: "不限", value: 0 },
        { text: "整租", value: 1 },
        { text: "合租", value: 2 }
      ],
      prices: [
        { text: "不限", value: "" },
        { text: "600以下", value: "-600" },
        { text: "600_1000元", value: "600_1000" },
        { text: "1000_1500元", value: "1000_1500" },
        { text: "1500_2000元", value: "1500_2000" },
        { text: "2000_3000元", value: "2000_3000" },
        { text: "3000_5000元", value: "3000_5000" },
        { text: "5000_8000元", value: "5000_8000" },
        { text: "8000以上", value: "+8000" }
      ]
    };
  },
  props: {
    showCount: {
      type: Number,
      default: 0
    },
    filterAddress: {
      type: Array,
      default: () => []
    },
    filter: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    ...mapState(["position"])
  },
  methods: {
    getResources(filterOptions) {
      this.loading = true;

      getResources({
        pageNum: this.pageNum,
        pageSize: this.showCount || this.pageSize,
        filter: filterOptions
      }).then(({ data }) => {
        // this.resources = data ? data.records : [];
        data.records.forEach(item => {
          this.resources.push(item);
        });
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (data.records.length === 0 || this.showCount) {
          this.finished = true;
        } else {
          this.finished = false;
        }
        this.pageNum++;
      });
    },
    reloadFilter() {
      this.resources = [];
      this.pageNum = 1;
    },
    handleRentChange(val) {
      this.isLoading = true;
      this.reloadFilter();
      if (val) {
        if (val.includes("-")) {
          this.filterOptions.upPrice = val.slice(1);
        }
        if (val.includes("+")) {
          this.filterOptions.lowPrice = val.slice(1);
        }
        if (val.includes("_")) {
          this.filterOptions.lowPrice = val.split("_")[0];
          this.filterOptions.upPrice = val.split("_")[1];
        }
      } else {
        this.filterOptions.lowPrice = "";
        this.filterOptions.upPrice = "";
      }
      console.log(JSON.parse(JSON.stringify(this.filterOptions)));
      this.getResources(JSON.parse(JSON.stringify(this.filterOptions)));
    },
    handleRentMethodChange() {
      this.isLoading = true;
      this.reloadFilter();
      this.getResources(JSON.parse(JSON.stringify(this.filterOptions)));
    },
    handleFilter(type) {
      this.isLoading = true;
      if (type === this.filterType) {
        this.filterType = 0;
      } else {
        this.filterType = type;
      }
    },
    handleFilterChange(area) {
      this.reloadFilter();
      this.filterOptions.address = area.value;
      this.$refs.address.toggle(false);
      console.log(JSON.parse(JSON.stringify(this.filterOptions)));
      
      this.getResources(JSON.parse(JSON.stringify(this.filterOptions)));
    },
    onLoad() {
      console.log(JSON.parse(JSON.stringify(this.filterOptions)));
      if (this.filterOptions.address) {
        this.getResources(JSON.parse(JSON.stringify(this.filterOptions)));
      } else {
        if (this.position.city) {
          this.filterOptions.address = this.position.city;
          this.onLoad();
        } else {
          setTimeout(() => {
            this.onLoad();
          }, 100);
        }
        return;
      }
    }
  }
};
</script>

<style lang="scss">
.hk-recommend__list {
  text-align: center;
}
</style>
