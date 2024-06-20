import type { App } from "vue"

interface modulePluginType {
  default: {
    install: (app:App) => void
  }
}
type modulePluginTypes = Record<string, modulePluginType>


export const globalPlugins = (app:App) => {
  // 动态引入所有插件
  const globalModules:modulePluginTypes = import.meta.glob("./**/*.ts", { eager: true })
  // console.log(globalModules)
  // 遍历所有插件
  Object.keys(globalModules).forEach((key) => {
    // 获取插件配置
    const module: modulePluginType = globalModules[key]
    // console.log(module);
    if (module.default && module.default.install) {
      // 安装插件
      module.default.install(app)
    }
  })

}
