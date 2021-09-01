import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// import ECharts from 'vue-echarts'
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import * as echarts from 'echarts'
import './assets/css/global.css'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.config.productionTip = false
// 把包挂载到vue的原型对象上，
// 这样Vue的每个组件都可以通过this直接访问到$http，
// 从而发起请求

axios.defaults.baseURL = 'http://localhost:8080/'
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$echarts = echarts
// Vue.component('chart', ECharts)
