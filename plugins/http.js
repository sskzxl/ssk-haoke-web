import Vue from "vue";
import { Toast } from "vant";
import axios from "axios";

const _http = axios.create({});
let _redirect;
let _store;
_http.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("haoke_token");
  if (config.url.includes("/api")) {
    config.headers.Authorization = userToken;
  }
  return config;
});

_http.interceptors.response.use(
  function httpResponse(response) {
    if (response.data) {
      return response.data;
    } else {
      Toast.fail(response.data.resultMsg || "请求服务失败");
      return response.data;
    }
  },
  function httpError(error) {
    if (!error.response) {
      return;
    }
    const rep = error.response;
    console.log('x', rep);
    
    if (rep.status === 401 || rep.status === 403) {
      window.localStorage.removeItem("haoke_token");
      _store.commit("setToken", "");
      _redirect("/login");
    }
    Toast.fail(error.response.data.resultMsg || "请求服务失败");
    return Promise.reject(error);
  }
);

export default function ({ store, redirect }) {
  _redirect = redirect;
  _store = store;
  Vue.prototype.$http = _http;
}
export const http = _http;
