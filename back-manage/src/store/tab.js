import Cookies from 'js-cookie'
// import router from '../../router'
// import router from '../views/other'
export default {
  state: {
    // 侧边栏是否折叠
    isCollapse: false,
    // 面包屑初始数据
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'home/home',
      },
    ],
    // 当前选中路由
    currentMenu: null,
    // 侧边栏数据
    menu: [],
  },
  mutations: {
    // 改变isCollapse值，实现侧边栏折叠
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    // 点击菜单，改变tabList值
    selsectMenu(state, val) {
      if (val.name !== 'home') {
        // 改变当前选中路由
        state.currentMenu = val
        // 判断当前选中路由是否在tabsList中
        const result = state.tabsList.findIndex(
          (item) => item.name === val.name
        )
        if (result === -1) {
          state.tabsList.push(val)
        }
      } else {
        // 选中为首页，重置当前选中
        state.currentMenu = null
      }
    },
    // 删除要删除的标签
    closeTag(state, val) {
      const index = state.tabsList.findIndex((item) => item.name === val.name)
      state.tabsList.splice(index, 1)
    },
    setMenu(state, val) {
      state.menu = val
      // 以防刷新丢失
      Cookies.set('menu', JSON.stringify(val))
    },
    clearMenu(state) {
      state.menu = []
      Cookies.remove('menu')
    },
    addMenu(state, router) {
      // 如果Cookies中不存在menu
      if (!Cookies.get('menu')) {
        return
      } else {
        // 将cookie中的menu转成对象
        const menu = JSON.parse(Cookies.get('menu'))
        state.menu = menu
        const menuArray = []
        menu.forEach((item) => {
          // 如果是有子菜单的
          if (item.children) {
            item.children = item.children.map((item) => {
              item.component = () => import(`../views/${item.url}`)
              return item
            })
            menuArray.push(...item.children)
          } else {
            console.log('../views/' + item.url)
            item.component = () => import(`../views/${item.url}`)
            menuArray.push(item)
          }
        })
        // 路由的动态添加
        menuArray.forEach((item) => {
          if (item.path === '/') {
            item.path = '/home'
          }
          router.addRoute('Main', item)
        })
      }
    },
  },
}
