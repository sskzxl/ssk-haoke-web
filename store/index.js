import { http } from "~/plugins/http";

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
    {
      tabTitle: "资讯",
      curr: false,
      icon: "orders-o",
      path: "/news"
    },
    {
      tabTitle: "我的",
      curr: false,
      icon: "friends-o",
      path: "/user"
    }
  ],
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
  }
};

export const actions = {
  getUserInfo(context) {
    return http.get("/api/users/info").then(res => {
      context.commit("setUserInfo", res.data);
      return res.data;
    });
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
      context.commit("token", "");
    });
  },
};
