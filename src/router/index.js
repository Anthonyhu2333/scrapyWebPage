import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Device from '../components/Device.vue'
import Websites from '../components/Websites.vue'
import FileUpload from '../components/FileUpload.vue'
import Welcome from '../components/Welcome.vue'
import ScrapyConfig from '../components/ScrapyConfig.vue'
import DataStore from '../components/DataStore.vue'
import DataAlarm from '../components/DataAlarm.vue'
import DBConfig from '../components/DB/DBConfig.vue'
import DBAlarm from '../components/DB/DBAlarm.vue'
import DBStore from '../components/DB/DBStore.vue'
import Statistic from '../components/Statistic.vue'
import DataCheck from '../components/DataCheck.vue'
import DeviceLocation from '../components/DeviceLocation.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home,
  redirect: '/welcome',
  children: [{
    path: '/deviceManger',
    component: Device
  }, {
    path: '/websitesManger',
    component: Websites
  }, {
    path: 'fileUploadAndDownload',
    component: FileUpload

  }, {
    path: '/welcome',
    component: Welcome
  },
  {
    path: '/scrapyconfig',
    component: ScrapyConfig
  }, {
    path: '/dataStore',
    component: DataStore
  }, {
    path: '/dataAlarm',
    component: DataAlarm
  }, {
    path: '/DBconfig',
    component: DBConfig
  }, {
    path: '/DBStore',
    component: DBStore
  }, {
    path: '/DBAlarm',
    component: DBAlarm
  }, {
    path: '/Statistic',
    component: Statistic
  }, {
    path: '/DataCheck',
    component: DataCheck
  }, {
    path: '/DeviceLocation',
    component: DeviceLocation
  }
  ]
}]

const router = new VueRouter({
  routes
})
export default router
