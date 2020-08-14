import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const now = new Date();
//别忘记加store
const store=new Vuex.Store({
    /*状态*/
    state: {
        routes: [],
        sessions:[{
            id:1,
            user:{
                name:'示例介绍',
                img:'../../public/assert/2.jpg'
            },
            messages:[{
                content:'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                date:now
            },{
                content:'项目地址(原作者): https://github.com/coffcer/vue-chat',
                date:now
            },{
                content:'本项目地址(重构): https://github.com/is-liyiwei',
                date:now
            }]
        },{
            id:2,
            user:{
                name:'webpack',
                img:'../../public/assert/3.png'
            },
            messages:[{
                content:'Hi，我是webpack哦',
                date:now
            }]
        }],
        currentSessionId:1,
        filterKey:''

    },
    /*获得变异状态*/
    getters: {

    },
    /*处理异步请求的地方*/
    actions: {
        initData (context) {
            context.commit('INIT_DATA')
        }
    },
    /*改变状态专用*/
    mutations: {
        changeRoutes(state,data){
            state.routes=data
        },
        changeCurrentSessionId (state,id) {
            state.currentSessionId = id;
        },
        addMessage (state,msg) {
            state.sessions[state.currentSessionId-1].messages.push({
                content:msg,
                date: new Date(),
                self:true
            })
        },
        INIT_DATA (state) {
            let data = localStorage.getItem('vue-chat-session');
            //console.log(data)
            if (data) {
                state.sessions = JSON.parse(data);
            }
        }
    }
})
store.watch(function (state) {
    return state.sessions
},function (val) {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
},{
    deep:true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})
export default store
