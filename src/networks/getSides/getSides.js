import {request} from '../request'

/*import store from '../../store/index'

import router from '../../router/index'*/

export function requestSides() {
    return request({
        url: '/getSides',
        method: 'get',
    })
}

export const getRouters= (store,router) => {
    if (store.state.routes.length <= 0) {
        console.log(store.state.routes.length);
        requestSides().then(res => {
            let formatData = formatter(res.data);
            //使用了该方法后在$router中是看不到routes的（大坑）
            //反复假如router会报router重复，问题尚未解决
            router.addRoutes(formatData)
            store.commit('changeRoutes', formatData)
            console.log(formatter(res.data));
            console.log(store.state.routes);
            /*            console.log(path);
                        console.log(name)*/
        })
    }
}
function formatter(data) {
    let router=[];
    data.forEach(function (data) {
        let {path, name,iconcls,meta, component, children} = data;
        if (children &&children instanceof Array){
            children=formatter(children);
        }
        let route={
            path: path,
            name: name,
            meta: meta,
            iconCls: iconcls,
            children: children,
            component(resolve){
                //要导入Home不然他的嵌套路由找不到module
                if (component.startsWith("Home")){
                    //不能用import懒加载社会啊社会
                    require(['../../views/home/' + component + '.vue'], resolve);
                }else {
                    require(['../../views/' + component + '.vue'], resolve);
                }
            }
        }
        router.push(route)
    })
    return router;

}
