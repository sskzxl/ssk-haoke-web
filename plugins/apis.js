import { http } from "~/plugins/http";

export function getResource(id) {
    return http.get(`/api/house/resources/${id}`)
}

export function getResources(params) {
    return http.get('/api/house/resources', {
        params,
    })
}

export function getBanners() {
  return http.get("/api/ad");
}

export function getCityList() {
  return http.get("/api/house/resources/allCity");
}

export function getLocation() {
  return http.get("http://ip-api.com/json", {});
}

export function getSearch(keyword, page = 1) {
  return http.get("/api/search", { params: { keyword, page }});
}

export function getHouseByMap(params) {
  return http.get("/api/house/map/", { params });
}
