import {request} from "../request";

import Qs from 'qs'

export function getDepartment() {
    return request({
        url: '/sys/basic/department/',
        method: 'get'
    })
}

export function getName() {
    return request({
        url: '/sys/basic/department/getDepartment',
        method: 'get'
    })
}

export function insertDepartment(data) {
    return request({
        url: '/sys/basic/department/insertDepartment',
        method: 'post',
        data: data
    })
}

export function deleteDepartment(data) {
    return request({
        url: '/sys/basic/department/deleteDep',
        method: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: Qs.stringify(data)
    })
}

