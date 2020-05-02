import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import {getRouters} from  './networks/getSides/getSides'
//使用ElementUi和font-awesome
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false
Vue.use(ElementUI);


//为什么要用beforeEach
router.beforeEach((to,from,next)=>{
  /*只有在home页才需要动态导航栏*/
  if (to.path==='/'){
    next();
  } else {
    //在浏览器地址瞎吉儿输入也能跳到next（‘/’）的代码逻辑
    if (window.sessionStorage.getItem("user")){
      getRouters(store,router)
      next();
    }else {
      next('/?redict='+to.path)
    }
  }
  //
  //必须把from放出来继续走
})

new Vue({
  store,
  router,
  render: h => h(App)
  //Vue对象挂载到div id=app 上，等于el根实例
}).$mount('#app')

