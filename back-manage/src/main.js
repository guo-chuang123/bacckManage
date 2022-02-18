import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/common.less'

import store from './store'

// 按需使用element-ui
import {
  Container,
  Main,
  Header,
  Aside,
  Button,
  Radio,
  RadioGroup,
  RadioButton,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Row,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Divider,
  Descriptions,
  DescriptionsItem,
  Tag,
  Table,
  TableColumn
} from 'element-ui'
// 路由配置
import router from '../router/index'

Vue.config.productionTip = false

Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Button)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Divider)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Tag)
Vue.use(Table)
Vue.use(TableColumn)

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')
