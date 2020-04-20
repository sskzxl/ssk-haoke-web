<template>
  <div class="hk-user">
    <div class="hk-user-info">
      <van-row type="flex" justify="center" align="center">
        <van-col span="6" class="hk-user__pic">
          <van-image v-if="user && user.headUrl" src="http://image.haoke.com/head/defaultHead.jpg"></van-image>
        </van-col>
        <van-col span="18">
          <div v-if="user">
            <h3>{{ user.username }}</h3>
            <p>编辑个人资料</p>
          </div>
          <h3 v-else>
            <nuxt-link to="/login" style="color: #666;">点击登录</nuxt-link>
          </h3>
        </van-col>
      </van-row>
    </div>
    <div class="hk-user-nav">
      <van-grid>
        <van-grid-item
          v-for="nav in navs"
          :key="nav.name"
          :icon="nav.icon"
          :text="nav.name"
          @click="handleNavClick(nav)"
        >
        </van-grid-item>
      </van-grid>
    </div>
    <div class="hk-module" style="margin-top: 40px">
      <h4>猜您喜欢</h4>
      <div class="hk-module__inner">
        <ResourceList
          :showCount="3"
          :filter="false"
          :data="resources"
        ></ResourceList>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import ResourceList from "~/components/resource-list";
export default {
  layout: "normal",
  name: "UserCenter",
  components: {
    ResourceList
  },
  computed: {
    ...mapState(["user"]),
    token: function() {
      const token = this.$store.state.token;
      if (token) {
        this.setShowLogout(true);
      }
      return token;
    }
  },
  data() {
    return {
      navs: [
        {
          name: "看房记录",
          icon: "browsing-history-o",
          link: ""
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
  created() {
    console.log(this);
    this.getUserInfo();
  },
  methods: {
    ...mapMutations(["setShowLogout"]),
    ...mapActions(["getUserInfo"]),
    handleNavClick(nav) {
      this.$router.push({
        path: nav.link
      });
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

  .hk-user__pic {
    text-align: center;
    font-size: 24px;
  }

  .hk-user__default {
    border-radius: 50%;
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
