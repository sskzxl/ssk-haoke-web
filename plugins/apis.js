import { http } from "~/plugins/http";

export function getResource(id) {
    return http.get(`/api/house/resources/${id}`)
}

export function getResources(params) {
    return http.get('/api/house/resources', {
        params,
    })
}