
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from 'vue'

export default {
  install(app: App) {
    app.use(ElementPlus, {
      locale: zhCn,
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}
