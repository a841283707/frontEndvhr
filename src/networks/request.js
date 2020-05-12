
//导入axios
import axios from 'axios'
import {Message} from "element-ui";

//创造一个实例对象
const instance=axios.create({
    //踩坑任何访问路径必须带上协议头
    //遇到跨域问题时首先也要往本机发送请求
    //然后在代理处改变域名
    baseURL: 'http://localhost:8012',
    timeout: 3000
})

//对实例对象配置请求和响应拦截器
export  function request(config) {
    instance.interceptors.request.use(config=>{
        //
        return config
    },error => {
        //Promise.reject等价于这个
        //new Promise(function (resolve, reject) {
        //     resolve('fun');
        // });
        return Promise.reject(error)
    }),
    instance.interceptors.response.use(response=>{
        if (response.status===200 && response.data.status===500 ) {
            Message.error(response.data.msg);
            return ;
        }
        return response
    },error => {
        //504	指示服务器在充当网关或代理时没有从上游服务器接收到及时的响应
        //404   指示请求的资源不可用
        //403	指示服务器理解请求但拒绝完成它
        //401   指示请求需要进行 HTTP 验证
        if (error.response.status===504 || error.response.status===404 ) {
            Message.error("服务器出错")
        }else if (error.response.status===403) {
            Message.error("权限不够")
        }else if (error.response.status===401){
            Message.error("尚未登陆")
        }
        //（踩坑）没有返回promise的话那么只能在res里面捕捉到
        //和Promise.resolve("null")相同
        //和 new Promise((resolve,reject)=>{resolve("null")}相同，同理throw和Promise.reject相同
        return null;
    })
    return instance.request(config)
}

export function postRequest(url,data) {
    return request({
        url: url,
        method:'post',
        data: data
    })
}

export function putRequest(url,data) {
    return request({
        url: url,
        method: 'put',
        data: data
    })

}

export function getRequest(url,data) {
    return request({
        url: url,
        params: data,
        method: 'get'
    })
}

export function deleteRequest(url,data) {
    return request({
        url: url,
        method: 'delete',
        params: data
    })
}