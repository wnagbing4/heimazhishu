
import { createPinia } from 'pinia'
import type { App } from 'vue'
// plugin持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default {
  install(app:App) {
    app.use(pinia)
  }
}
