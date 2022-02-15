import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
// 按需使用element-ui
import { Button } from 'element-ui'
// 路由配置
import router from '../router/index'

Vue.config.productionTip = false
Vue.use(Button)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
