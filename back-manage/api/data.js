import axios from './axios'
// 获取侧边栏数据
export const getMenu = (param) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: param,
  })
}
// 获取首页左下角表格数据
export const getData = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get',
  })
}
// 更新用户数据
export const editData = (formData) => {
  return axios.request({
    url: '/user/edit',
    method: 'post',
    data:formData
  })
}
// 添加用户数据
export const addData = (formData) => {
  return axios.request({
    url: '/user/add',
    method: 'post',
    data:formData
  })
}

// 获取信息列表
export const getUser = (params) => {

  return axios.request({
    url: '/user/getUser',
    method: 'get',
    params
  })
}


