import { http } from "~/plugins/http";

export function getResource(id) {
  return http.get(`/api/house/resources/${id}`);
}

export function getResources(params) {
  return http.get("/api/house/resources", {
    params
  });
}

// export function getBanners() {
//   return http.get("/api/ad");
// }

export function getCityList() {
  return http.get("/api/house/resources/allCity");
}

export function getLocation() {
  return http.get("http://ip-api.com/json", {});
}

export function getSearch(keyword, page = 1) {
  return http.get("/api/search", { params: { keyword, page } });
}

export function getHouseByMap(params) {
  return http.get("/api/house/map/", { params });
}

export function getCity(params) {
  params = Object.assign(
    {},
    {
      app_id: "hopi8sosqpjubhml",
      app_secret: "N3k4S0lQS2dJV0UrcFlWc1czNTBBQT09"
    },
    params
  );
  return http.get("https://www.mxnzp.com/api/address/search", { params });
}

export function getUserListByIM(fromId) {
  return http.get("/api/v1/house/message/user/list", { params: { fromId } });
}

export function getRecordListByIM(fromId, toId) {
  return http.get("/api/v1/house/message", { params: { fromId, toId } });
}

export function getContact(fromId, toId) {
  return http.get("/api/v1/house/message/user/contact", {
    params: { fromId, toId }
  });
}
export function getBookingPage(id) {
  return http.get(`/api/house/book/${id}`);
}
export function commitBooking(addBook) {
  return http.post(`/api/house/book/commit`, addBook);
}
export function getBookList(params) {
  return http.get(`/api/house/book/page`, {
    params
  });
}
export function getBookListByReqId(id) {
  return http.get(`/api/house/book/req/${id}`);
}
