import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//别忘记加store
const store=new Vuex.Store({
    /*状态*/
    state: {
        routes: []

    },
    /*获得变异状态*/
    getters: {

    },
    /*处理异步请求的地方*/
    actions: {

    },
    /*改变状态专用*/
    mutations: {
        changeRoutes(state,data){
            state.routes=data
        }
    }
})

export default store