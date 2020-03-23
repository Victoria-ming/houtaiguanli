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

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
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
// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
