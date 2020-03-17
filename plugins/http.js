import Vue from "vue";
import { Toast } from "vant";
import axios from "axios";

const _http = axios.create({});
let _redirect;
_http.interceptors.request.use(config => {
  const userToken = localStorage.getItem("haoke_token");
  config.headers.Authorization = userToken;
  return config;
});

_http.interceptors.response.use(
  function httpResponse(response) {
    if (response.data && response.data.status === 0) {
      return response.data;
    } else {
      Toast.fail(response.data.msg);
      return response.data;
    }
  },
  function httpError(error) {
    if (!error.response) {
      return;
    }
    const rep = error.response
    if (rep.status === 401) {
        _redirect("/login");
    } 
    Toast.fail(error.response.data.msg);
    return Promise.reject(error);
  }
);

export default function({ redirect }) {
    _redirect = redirect;
    Vue.prototype.$http = _http;
}
export const http = _http;
