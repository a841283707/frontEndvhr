import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login.vue'
import Home from '../views/home/Home'
import ChangePassword from '../views/login/ChangePassword'
import Chat from '../views/Chat'

import ViewOne from '../views/siderView/viewOne'
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Login',
      component: Login,
      //利用hidden属性为true来决定是否渲染组件
      hidden: true
    },
    {
      path:'/home',
      name: 'home',
      component: Home,
      //碰到在一个路由页面需要动态显示某些页面的话一定要想到路由嵌套
      hidden: false
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: ChangePassword
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
    }

]

const router = new VueRouter({
  routes
})

export default router
