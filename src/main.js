import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
// 导入mock中的数据
import './mockjs/index.js'
// import store from './store'
// 导入 NProgress 包对应的JS和CSS
// import NProgress from 'nprogress'

import axios from 'axios'
axios.defaults.baseURL = 'https://elm.cangdu.org'
axios.interceptors.request.use(config => {
  // console.log(config)
  // NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
axios.interceptors.response.use(config => {
  // console.log(config)
  // NProgress.done()
  // 在最后必须 return config
  return config
})
// 挂载到Vue原型对象上
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
