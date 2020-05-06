import { http } from "~/plugins/http";
import { getCityList, getUserListByIM } from "../plugins/apis";

export const state = () => ({
  title: "",
  navIndex: 0,
  isShowConcat: false,
  isShowLogout: false,
  navs: [
    {
      tabTitle: "首页",
      curr: true,
      icon: "home-o",
      path: "/"
    },
    {
      tabTitle: "找房",
      curr: false,
      icon: "search",
      path: "/resource"
    },
    {
      tabTitle: "消息",
      curr: false,
      icon: "chat-o",
      path: "/message"
    },
    // {
    //   tabTitle: "资讯",
    //   curr: false,
    //   icon: "orders-o",
    //   path: "/news"
    // },
    {
      tabTitle: "我的",
      curr: false,
      icon: "friends-o",
      path: "/user"
    }
  ],
  banners: [],
  position: { city: "", district: "" },
  citys: [],
  iMUsers: [],
  user: null,
  token: window.localStorage.getItem("haoke_token")
});

export const mutations = {
  setTitle(state, title) {
    state.title = title;
  },
  setNav(state, index) {
    state.navIndex = index;
  },
  setNavForPath(state, path) {
    state.navs.forEach((item, index) => {
      if (item.path === path) {
        state.navIndex = index;
      }
    });
  },
  setShowConcat(state, value) {
    state.isShowConcat = value;
  },
  setShowLogout(state, value) {
    state.isShowLogout = value;
  },
  setToken(state, value) {
    state.token = value;
  },
  setUserInfo(state, value) {
    state.user = value;
  },
  setBanners(state, value) {
    state.banners = value;
  },
  setCityList(state, value) {
    state.citys = value;
  },
  setCity(state, value) {
    state.position.city = value;
  },
  setDistrict(state, value) {
    state.position.district = value;
  },
  setIMUserList(state, value) {
    state.iMUsers = value;
  }
};

export const actions = {
  getUserInfo(context) {
    if (context.state.token) {
      return http.get("/api/users/info").then(res => {
        context.commit("setUserInfo", res.data);
        return res.data;
      });
    }
  },
  login(context, { username, password }) {
    return http.post("/api/users/login", {
      username,
      password
    });
  },
  logout(context) {
    return http.post("/api/users/logout").then(res => {
      window.localStorage.removeItem("haoke_token");
      context.commit("setUserInfo", null);
      context.commit("setToken", "");
      context.commit("setShowLogout", false);
    });
  },

  getCityList(context) {
    return getCityList().then(res => {
      context.commit(
        "setCityList",
        res.data.map(item => {
          const i = {};
          i[String(item.value)] = item.label;
          return i;
        })
      );
    });
  },
  getIMUserList(context, fromId) {
    return getUserListByIM(fromId).then(res => {
      context.commit("setIMUserList", res.data);
    });
  }
};