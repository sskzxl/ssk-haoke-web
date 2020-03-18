<template>
  <nuxt-link :to="`/resource/${data.id}`">
    <van-row type="flex" class="hk-recommend__item">
      <van-col :span="9">
        <img :src="`${imgUrl}/${data.pic}`" />
      </van-col>
      <van-col :span="15">
        <h5>{{ data.title }}</h5>
        <h6>
          {{ data.houseType }}/{{ data.coveredArea }}㎡/{{
            data.orientation
          }}/{{ data.floor }}
        </h6>
        <div class="hk-recommend__tag">
          <van-tag v-for="tag in data.tags" :key="tag" type="primary">{{
            tag
          }}</van-tag>
        </div>
        <p>{{ data.rent }}元/月</p>
      </van-col>
    </van-row>
  </nuxt-link>
</template>

<script>
import config from "~/app.config";
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imgUrl: config.sourceUrl.img
    }
  }
};
</script>

<style lang="scss">
.hk-recommend__item {
  padding: 6px 0;
  text-align: left;
  background-color: #fff;

  h5 {
    font-weight: normal;
    font-size: 16px;
    color: #333;
  }

  h6 {
    font-weight: normal;
    font-size: 12px;
    color: #999;
  }

  p {
    font-size: 18px;
    color: red;
  }

  img {
    display: block;
    width: 90%;
    margin: 0 auto;
  }
}

.hk-recommend__tag {
  .van-tag {
    margin-right: 4px;
  }
}
</style>
