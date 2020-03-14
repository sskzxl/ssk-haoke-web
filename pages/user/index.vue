<template>
  <div class="hk-user">
    <div class="hk-user-info">
      <van-row>
        <van-col span="6">
          <van-image></van-image>
        </van-col>
        <van-col span="18">
          <h3 v-if="user"></h3>
          <h3 else><nuxt-link to="/login" style="color: #666;">点击登录</nuxt-link></h3>
          <p>编辑个人资料</p>
        </van-col>
      </van-row>
    </div>
    <div class="hk-user-nav">
      <van-grid>
        <van-grid-item v-for="nav in navs" :key="nav.name" :icon="nav.icon" :text="nav.name" @click="handleNavClick(nav)">
        </van-grid-item>
      </van-grid>
    </div>
    <div class="hk-module" style="margin-top: 40px">
      <h4>猜您喜欢</h4>
      <div class="hk-module__inner">
        <ResourceList :showCount="3" :filter="false" :data="resources"></ResourceList>
      </div>
    </div>
  </div>
</template>

<script>
import ResourceList from '~/components/resource-list'
export default {
  layout: "normal",
  components: {
    ResourceList,
  },
  data() {
    return {
      user: '',
      navs: [
        {
          name: "看房记录",
          icon: "browsing-history-o",
          link: "/"
        },
        {
          name: "我的订单",
          icon: "orders-o",
          link: ""
        },
        {
          name: "我的收藏",
          icon: "send-gift-o",
          link: ""
        },
        {
          name: "身份认证",
          icon: "debit-pay",
          link: ""
        },
        {
          name: "联系我们",
          icon: "phone-o",
          link: ""
        },
        {
          name: "电子合同",
          icon: "notes-o",
          link: ""
        },
        {
          name: "房屋管理",
          icon: "completed",
          link: ""
        },
        {
          name: "钱包",
          icon: "paid",
          link: ""
        }
      ],
      resources: []
    };
  },
  methods: {
    handleNavClick(nav) {
      this.$router.push({
        path: nav.link
      })
    }
  }
};
</script>

<style lang="scss">
.hk-user-info {
  padding: 20px 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;

  h3 {
    font-weight: normal;
    margin-bottom: 10px;
  }
  p {
    color: #999;
    font-size: 14px;
  }
}
.hk-user-nav {
  background-color: #fff;
  text-align: center;

  a {
    display: block;
    padding: 20px 10px;

    p {
      margin-top: 10px;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
