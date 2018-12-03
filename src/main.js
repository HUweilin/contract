// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import ElementUI from 'element-ui'

import 'bootstrap/dist/css/bootstrap.css'
import 'element-ui/lib/theme-chalk/index.css'

import Selection from './components/shared/select.vue'
import RecordForm from './components/shared/recordForm.vue'
import RecordList from './components/shared/recordList.vue'
import Pagination from './components/shared/pagination.vue'

import '@/assets/css/index.css'

import filters from './utils/filters.js'

// service
import tokenService from './services/tokenService'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.use(ElementUI)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response && error.response.data) {
      let data = error.response.data
      if (data.code === 401 && data.msg === 'Token has expired') {
        tokenService.removeToken()
        router.replace({name: 'login'})
      }
    }
    // 返回接口返回的错误信息
    return Promise.reject(error)
  })
Vue.prototype.$http = axios
// 注册全局消息提示
Vue.prototype.$error = (msg) => {
  Vue.prototype.$message({'message': msg, 'type': 'error'})
}

Vue.prototype.$warning = (msg) => {
  Vue.prototype.$message({'message': msg, 'type': 'warning'})
}

Vue.prototype.$success = (msg) => {
  if (!msg) {
    Vue.prototype.$message({'message': '成功', 'type': 'success'})
  } else {
    Vue.prototype.$message({'message': msg, 'type': 'success'})
  }
}

Vue.component('Select', Selection)
Vue.component('record-form', RecordForm)
Vue.component('record-list', RecordList)
Vue.component('Pagination', Pagination)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
