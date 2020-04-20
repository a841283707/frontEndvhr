import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
  //Vue对象挂载到div id=app 上，等于el根实例
}).$mount('#app')

