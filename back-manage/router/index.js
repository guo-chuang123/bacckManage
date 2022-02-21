import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../src/views/Main.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        label: '首页',
        component: () => import('../src/views/home/home.vue'),
      },
      {
        path: '/goods',
        name: 'goods',
        label: '商品管理',
        component: () => import('../src/views/goods/goods.vue'),
      },
      {
        path: '/user',
        name: 'user',
        label: '用户管理',
        component: () => import('../src/views/user/User.vue'),
      },

          {
            path: '/otherOne',
            name: 'otherOne',
            label: "页面一",
            component:()=> import("../src/views/other/otherOne.vue")
          },
          {
            path: '/otherTwo',
            name: 'otherTwo',
            label: "页面一",
            component:()=> import("../src/views/other/otherTwo.vue")
          }
        ]
      
    
  },
]
const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
