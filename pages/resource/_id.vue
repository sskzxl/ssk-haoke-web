<template>
  <div>
    <van-nav-bar
      fixed=""
      :title="resource.title"
      left-arrow
      @click-left="handleBack"
      @click-right="handleShare"
    >
      <template v-slot:right>
        <van-icon name="share" />
      </template>
    </van-nav-bar>
    <div class="hk-resource-details">
      <van-swipe
        class="hk-details__pic"
        :autoplay="3000"
        indicator-color="white"
      >
        <van-swipe-item><img :src="`${imgUrl}/${resource.pic}`" /></van-swipe-item>
        <van-swipe-item><img :src="`${imgUrl}/${resource.pic}`" /></van-swipe-item>
        <van-swipe-item><img :src="`${imgUrl}/${resource.pic}`" /></van-swipe-item>
        <van-swipe-item><img :src="`${imgUrl}/${resource.pic}`" /></van-swipe-item>
      </van-swipe>
      <div style="background-color: #fff">
        <h2>{{ resource.title }}</h2>
      </div>
      <p class="hk-details__tags">
        <van-tag v-for="item in resource.tags" :key="item" type="primary">{{
          item
        }}</van-tag>
        <span class="hk-details__time">{{ resource.created }}发布</span>
      </p>
      <div style="padding: 0 10px 10px">
        <van-row :gutter="20" class="hk-details__info">
          <van-col span="8">
            <h4>{{ resource.rent }}元/月</h4>
            <p>租金</p>
          </van-col>
          <van-col span="8">
            <h4>{{ resource.houseType }}</h4>
            <p>房型</p>
          </van-col>
          <van-col span="8">
            <h4>{{ resource.useArea }}平米</h4>
            <p>面积</p>
          </van-col>
        </van-row>
        <div>
          <van-row :gutter="20" class="hk-details__more">
            <van-col span="12">
              <span>装修：</span>
              <span>{{ $data.$decoration[resource.decoration] }}</span>
            </van-col>
            <van-col span="12">
              <span>楼层：</span>
              <span>{{ resource.floor }}</span>
            </van-col>
            <van-col span="12">
              <span>朝向：</span>
              <span>{{ resource.orientation }}</span>
            </van-col>
            <van-col span="12">
              <span>类型：</span>
              <span>精装修</span>
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="hk-details__map">
        <p>小区： {{ resource.address }}</p>
        <div class="map-wrap"></div>
      </div>
      <div class="hk-details__thing">
        <h5>房屋配置</h5>
        <van-row style="text-align: center">
          <van-col span="4" v-for="item in resource.facilities" :key="item">
            <van-icon name="graphic" />
            <p>{{ $data.$types[Number.parseInt(item)] }}</p>
          </van-col>
        </van-row>
      </div>
      <div class="hk-details__describe">
        <h5>房屋描述</h5>
        <div style="padding: 16px 30px">
          <ChatUser
            :user="{ name: resource.contact, phone: resource.mobile }"
          ></ChatUser>
          <p class="hk-details__txt">
            回龙观东大街，全新家具家电，整体厨卫，整体卫浴，可以洗澡上网。房间干净整洁，芝麻信用分可抵押金。
            校区四个门四个公交站，回龙观公交总站300米，13号线回龙观东大街占1500米。
            回龙观东大街，全新家具家电，整体厨卫，整体卫浴，可以洗澡上网。房间干净整洁，芝麻信用分可抵押金。
            校区四个门四个公交站，回龙观公交总站300米，13号线回龙观东大街占1500米
            回龙观东大街，全新家具家电，整体厨卫，整体卫浴，可以洗澡上网。房间干净整洁，芝麻信用分可抵押金。
          </p>
        </div>
      </div>
      <div class="hk-details__recommend">
        <h5>猜您喜欢</h5>
        <ResourceList
          :filter="false"
          showCont="3"
          :data="recommendList"
        ></ResourceList>
      </div>
    </div>
    <div class="hk-details__tools">
      <van-row>
        <van-col span="6">
          <p>
            <van-icon name="star" />
            收藏
          </p>
        </van-col>
        <van-col span="18">
          <p><a href="联系房东">联系房东</a></p>
        </van-col>
        <!-- <van-col span="9">
          <p>
            <nuxt-link :to="{ path: '/subscribe', query: { resource_id: 1 } }"
              >预约看房</nuxt-link
            >
          </p>
        </van-col> -->
      </van-row>
    </div>
  </div>
</template>
<script>
import ResourceList from "~/components/resource-list";
import ChatUser from "~/components/chat-user";
import { getResource } from "~/plugins/apis";
import config from "~/app.config";
const types = {
  1: "洗衣机",
  2: "冰箱",
  3: "空调",
  4: "阳台",
  5: "卫生间",
  6: "电视",
  7: "热水器",
  8: "宽带",
  9: "沙发",
  10: "衣柜"
};
const decoration = {
  1: "精装",
  2: "简装",
  3: "毛坯"
};
export default {
  layout: "basic",
  components: {
    ResourceList,
    ChatUser
  },
  data() {
    return {
      $types: types,
      $decoration: decoration,
      recommendList: [],
      resource: {},
      imgUrl:config.sourceUrl.img
    };
  },
  asyncData({ params }) {
    return getResource(params.id).then(res => {
      return { resource: res.data };
    });
  },
  methods: {
    handleBack() {
      if (this.$route.query.from) {
        this.$router.push(`/${this.$route.query.from}`);
      } else {
        this.$router.back();
      }
    },
    handleShare() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss">
.hk-resource-details {
  h2 {
    padding: 10px 0;
    margin: 0 10px 10px;
    font-weight: normal;
    font-size: 18px;
  }

  .hk-details__time {
    float: right;
    font-size: 14px;
    color: #999;
  }
}

.hk-details__pic {
  height: 150px;
}

.hk-details__info {
  padding: 16px 0;
  background-color: #fff;
  text-align: center;

  h4 {
    line-height: 30px;
    color: red;
    font-size: 16px;

    & + p {
      color: #999;
      font-size: 14px;
    }
  }
}

.hk-details__more {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 16px 0;
  background-color: #fff;
}

.hk-details__map,
.hk-details__thing,
.hk-details__describe,
.hk-details__recommend {
  margin-top: 20px;
  background-color: #fff;

  & > h5 {
    font-weight: normal;
    font-size: 16px;
    padding: 0 10px;
    line-height: 40px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #eee;
  }
}

.hk-details__map p {
  padding: 10px;
}

.hk-details__thing {
  color: #666;

  .van-row {
    padding: 10px 0;
  }

  .van-col {
    padding: 12px 0;
  }

  .van-icon {
    font-size: 30px;
  }

  p {
    font-size: 14px;
  }
}

.hk-details__recommend {
  .hk-resources {
    padding: 0 10px 20px;
  }
}

.hk-details__tags {
  padding: 10px;
  background-color: #fff;
  overflow: hidden;
  margin-top: 10px;

  .van-tag {
    margin-right: 10px;
  }
}

.hk-details__more {
  font-size: 14px;
  line-height: 30px;

  span:first-child {
    padding-left: 20px;
    color: #999;
  }

  span:last-child {
    color: #333;
  }
}

.hk-details__describe {
  .hk-details__txt {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }
}

.hk-details__tools {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  text-align: center;
  box-shadow: 0 0 10px 0 #ddd;

  p {
    height: 60px;
    line-height: 60px;
  }
  a {
    color: #fff;
  }

  & .van-col:nth-child(2) {
    background-color: #ff8456;
  }
  & .van-col:last-child {
    background-color: #4bbbff;
  }

  .van-icon {
    color: #ff0505;
    font-size: 24px;
    vertical-align: sub;
  }
}
</style>
