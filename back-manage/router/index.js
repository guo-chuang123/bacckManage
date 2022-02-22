import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../src/store'
Vue.use(VueRouter)
// hash地址与组件的关系
const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../src/views/Main.vue'),
    redirect: '/home',
    children: [
      // {
      //   path: '/home',
      //   name: 'home',
      //   label: '首页',
      //   component: () => import('../src/views/home/home.vue'),
      // },
      // {
      //   path: '/goods',
      //   name: 'goods',
      //   label: '商品管理',
      //   component: () => import('../src/views/goods/goods.vue'),
      // },
      // {
      //   path: '/user',
      //   name: 'user',
      //   label: '用户管理',
      //   component: () => import('../src/views/user/User.vue'),
      // },
      // {
      //   path: '/otherOne',
      //   name: 'otherOne',
      //   label: '页面一',
      //   component: () => import('../src/views/other/otherOne.vue'),
      // },
      // {
      //   path: '/otherTwo',
      //   name: 'otherTwo',
      //   label: '页面一',
      //   component: () => import('../src/views/other/otherTwo.vue'),
      // },
    ],
  },
  {
    path: '/login',
    name: 'login',
    label: '登录界面',
    component: () => import('../src/views/login/login.vue'),
  },
]
// 创建一个路由实例
const router = new VueRouter({
  mode: 'history',
  routes,
})
// 解决路由重复
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
// 导航守卫
router.beforeEach((to, from, next) => {
  // 防止页面刷新，vuex丢失token值
  store.commit('getToken')
  const token = store.state.user.token
  // 如果token不存在，并且要访问的不是登录页
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})
export default router
