import Vue from 'vue'
import axios from 'axios'

const http = axios.create({
})

http.interceptors.response.use(function httpResponse(response) {
}, function httpError(error) {
})

Vue.prototype.$http = http