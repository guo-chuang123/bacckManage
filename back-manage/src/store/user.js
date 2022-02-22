import Cookies from "js-cookie";
export default {
  state: {
    token:''
  },
  mutations: {
    // 设置token值
    setToken(state, val) {
      state.token = val
      // 参数：cookie名称，设置的值
      Cookies.set("token",val)
    },
    // 清空token值
    clearToken(state) {
      state.token =''
      Cookies.remove('token')
    },
    // 获取token值
    getToken(state) {
      state.token =state.token|| Cookies.get('token')
    }
  }
}