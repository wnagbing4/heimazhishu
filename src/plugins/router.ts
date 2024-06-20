
import type { App } from 'vue'
import router from '@/router'

// 导出router实例
export default {
  install(app: App) {
    app.use(router)
  }
}
