import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/common.less'

import store from './store'
import router from '../router/index'
import http from 'axios'
import '../api/mock'
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
  TableColumn,
  Card,
  Breadcrumb,
  BreadcrumbItem,
  Input,
  Dialog,
  Form,
  FormItem,
  Select,
  Switch,
  DatePicker,
  Option,
  Pagination,
  Message,
  MessageBox,
  Notification,
} from 'element-ui'
// 路由配置

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

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
Vue.use(Card)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(Select),
  Vue.use(FormItem),
  Vue.use(Switch),
  Vue.use(DatePicker),
  Vue.use(Option),
  Vue.use(Pagination)

new Vue({
  store,
  router,
  render: (h) => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
