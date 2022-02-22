import Mock from 'mockjs'

import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import login from './mockServeData/permission'
// 拦截请求,使用mock返回数据
Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)

Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/user\/editUser/, 'post', userApi.updateUser)

Mock.mock(/permission\/getMenu/,'post',login.getMenu)
