import {request} from "../request";

export function getGrades() {
    return request({
        url: '/sys/basic/jobLevel/getGrades',
        method: 'get'
    })
}


/*  四种方法：get post put delete分别对应增删改查
    get：查
    post：增
    put：改
    delete：删

    其中get和delete没什么疑问，对于post和put网上有幂等这一说法
    其实没那么复杂，所谓的幂等就是多次操作影响的结果是几个
    比如一个页面没有做任何的措施，请求了10次，对于post增加了10条记录，影响了10条记录；
    但是对于put只对一个记录操作10次，只影响了1条记录。所以put是幂等的，而post不是
*/
export function addGrade(data) {
    return request({
        url: '/sys/basic/jobLevel/addGrade',
        method: 'post',
        data: data
    })

}