import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
// 数据管理
import userList from '../components/List/userList.vue'
import shopList from '../components/List/shopList.vue'
import foodList from '../components/List/foodList.vue'
import orderList from '../components/List/orderList.vue'
import adminList from '../components/List/adminList.vue'
// 添加数据
import addShop from '../components/Add/addShop.vue'
import addGoods from '../components/Add/addGoods.vue'
import addUser from '../components/Add/addUser.vue'
// 图表
import visitor from '../components/Visitor/visitor.vue'
// 编辑
import Edit from '../components/Edit/Edit.vue'
// 设置
import adminSet from '../components/Set/adminSet.vue'
// 说明
import explain from '../components/Explain/explain.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      // 数据管理
      { path: '/userList', component: userList },
      { path: '/shopList', component: shopList },
      { path: '/foodList', component: foodList },
      { path: '/orderList', component: orderList },
      { path: '/adminList', component: adminList },
      // 添加数据
      { path: '/addShop', component: addShop },
      { path: '/addGoods', component: addGoods },
      { path: '/addUser', component: addUser },
      // 图表
      { path: '/visitor', component: visitor },
      // 编辑
      { path: '/vueEdit', component: Edit },
      // 设置
      { path: '/adminSet', component: adminSet },
      // 说明
      { path: '/explain', component: explain }

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
