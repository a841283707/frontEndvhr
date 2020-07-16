import {request} from './request'

import Qs from 'qs'


export function loginRequest(url,data) {

    return request({
        url: url,
        data: Qs.stringify(data),
        method: 'post',
        contentType: 'application/x-www-form-urlencoded'

/*
        transformRequest:
*/
    })
}

export function logout() {
    return request({
        url: '/doLogout',
        method: 'post'
    })
}

export function requestSides() {
    return request({
        url: '/getSides',
        method: 'get',
    })
}