const Mock = require('mockjs')// mockjs 导入依赖模块
Mock.mock('https://elm.cangdu.org/menus', 'get', function () {
  return {
    data: [
      {
        id: 1,
        authName: '数据管理',
        children: [
          {
            id: 11,
            authName: '用户列表',
            path: 'userList'
          },
          {
            id: 12,
            authName: '商家列表',
            path: 'shopList'
          },
          {
            id: 13,
            authName: '食品列表',
            path: 'foodList'
          },
          {
            id: 14,
            authName: '订单列表',
            path: 'orderList'
          },
          {
            id: 15,
            authName: '管理员列表',
            path: 'adminList'
          }
        ]
      },
      {
        id: 2,
        authName: '添加数据',
        children: [
          {
            id: 21,
            authName: '添加商铺',
            path: 'addShop'
          },
          {
            id: 22,
            authName: '添加商品',
            path: 'addGoods'
          },
          {
            id: 23,
            authName: '添加用户',
            path: 'addUser'
          }
        ]
      },
      {
        id: 3,
        authName: '图表',
        children: [
          {
            id: 31,
            authName: '用户分布',
            path: 'visitor'
          }
        ]
      },
      {
        id: 4,
        authName: '编辑',
        children: [
          {
            id: 41,
            authName: '文本编辑',
            path: 'vueEdit'
          }
        ]
      },
      {
        id: 5,
        authName: '设置',
        children: [
          {
            id: 51,
            authName: '管理员设置',
            path: 'adminSet'
          }
        ]
      },
      {
        id: 6,
        authName: '说明',
        children: [
          {
            id: 61,
            authName: '说明',
            path: 'explain'
          }
        ]
      }
    ],
    meta: {
      status: 200,
      msg: '创建成功'
    }
  }
})
Mock.mock('https://elm.cangdu.org/login', 'post', function () {
  return {
    data: {
      id: 'jd_4fd90e635963',
      username: 'admin',
      password: '1234567',
      jd: 999
    },
    meta: {
      status: 200,
      msg: '创建成功'
    }
  }
})
