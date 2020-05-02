import {request} from "../request";

export function getPosition() {
    return request({
        url: '/sys/basic/position/',
        method: 'get'
    })

}

export function addPosition(data) {
    return request({
        url: '/sys/basic/position/add',
        method: 'get',
        params: data
    })

}

export function updatePosition(data) {
    return request({
        url: '/sys/basic/position/update',
        method: 'put',
        /*put,delete,patch 等restful api对应的请求方式同put*/
        /*可以params和data一起传，params用于url的拼接，
        data用于请求体，contentType作用请求体*/
        params: {
            id: 2,
        },
        data: data
    })
}

export function deletePosition(data) {
    return request({
        url: '/sys/basic/position/'+data,
        method: 'delete',
        /*put,delete,patch 等restful api对应的请求方式同put*/
        /*可以params和data一起传，params用于url的拼接，
        data用于请求体，contentType作用请求体*/

    })
}