<template>
  <van-tree-select
    :items="cityList"
    :active-id.sync="activeId"
    :main-active-index.sync="activeIndex"
    @click-item="handleAddressChange"
  />
</template>

<script>
  import {mapState} from "vuex";
  import {getCityList} from "~/plugins/apis";

  export default {
    data() {
      return {
        cityList: [],
        activeIndex: 0,
        activeId: 0
      };
    },
    props: {
      addressList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      ...mapState(["position"]),
      /*activeIndex() {
        return this.position.city;
      },
      activeId() {
        return this.position.district;
      }*/
    },
    mounted() {
      getCityList()
        .then(res => {
          this.cityList.push(
            ...res.data.map((city, idx) => {
              return {
                text: city.label,
                id: idx,
                children: city.child.map((c, cIdx) => {
                  return {text: c.label, id: cIdx}
                })
              };
            })
          );

          if (this.position.city) {
            const c = this.position.city + '市';
            this.activeIndex = this.cityList.findIndex(city => city.text === c);
            if (this.activeIndex === -1) {
              this.activeIndex = 0;
            }
          }
        });
    },
    methods: {
      handleAddressChange(val) {
        this.$emit('filter-change', val);
      }
    }
  };
</script>
<style lang="scss"></style>
