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
    closeTag(state,val) {
      const index= state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(index,1)
    }
  },
}
