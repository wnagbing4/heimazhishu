
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)
// 引入全局插件
import { globalPlugins } from './plugins/index'
globalPlugins(app)
// 全局样式
import "@/styles/index.scss"
app.mount('#app')
