import Mock from 'mockjs'
export default {
  getMenu: config => {
    // console.log(config);
    const { username, password } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    console.log(username);
    console.log(password);
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home/home'
            },
            {
              path: '/goods',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'goods/goods'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'user/user'
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/otherOne',
                  name: 'otherOne',
                  label: '页面1',
                  icon: 'setting',
                  url: 'other/otherOne'
                },
                {
                  path: '/otherTwo',
                  name: 'otherTwo',
                  label: '页面2',
                  icon: 'setting',
                  url: 'other/otherTwo'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/',
              name: 'main',
              label: '首页',
              icon: 's-home',
              url: 'home/home'
            },
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home/home'
            },
            {
              path: '/video',
              name: 'video',
              label: '商品管理',
              icon: 'video-play',
              url: 'goods/goods'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}
