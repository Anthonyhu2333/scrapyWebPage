import Vue from 'vue'
import Element, { Message, MessageBox } from 'element-ui'
import VideoPlayer from 'vue-video-player'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(VideoPlayer)
Vue.use(Element)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
