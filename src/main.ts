
import { createApp } from 'vue'

import App from './App.vue'
import CommonTable from "./components/CommonTable";
const app = createApp(App)
// 引入全局插件
import { globalPlugins } from './plugins/index'
globalPlugins(app)
// 全局样式
import "@/styles/index.scss"
app.use(CommonTable)
app.mount('#app')
