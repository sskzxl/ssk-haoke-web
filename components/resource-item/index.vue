<template>
  <div @click="toDetail(data.id, type)">
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
  </div>
</template>

<script>
import config from "~/app.config";
import { Dialog } from "vant";
import { delHouse } from "~/plugins/apis";
import { Toast } from "vant";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    type: ""
  },
  data() {
    return {
      imgUrl: config.sourceUrl.img
    };
  },
  methods: {
    toDetail(id, type) {
      if (type) {
        Dialog.confirm({
          closeOnClickOverlay: true,
          closeOnPopstate: "true",
          title: "请选择操作",
          confirmButtonText: "删除房源",
          cancelButtonText: "修改房源",
          cancelButtonColor: "#1989fa"
        })
          .then(() => {
            //删除房源
            delHouse(id).then(res => {
              if (0 == res.resultCode) {
                console.log("删除房源id:" + id);
                setTimeout(() => {
                  Toast.success("删除成功");
                }, 500);
                this.$emit("delHouse", id);
              }
            });
          })
          .catch(() => {
            this.$router.push(`/user/publish?id=${id}`);
            // on cancel
          });
        console.log("管理");
      } else {
        this.$router.push(`/resource/${id}`);
      }
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
