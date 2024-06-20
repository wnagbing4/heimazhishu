import type { RouteRecordRaw, Router } from "vue-router";
// 菜单仓库
import { useMenuStore } from "@/stores/useMenuStore"

// 获取动态路由
const moduleRoutes = import.meta.glob("./modules/*.ts", { eager: true })
type moduleRouteType = {
  default: RouteRecordRaw
}
// 合并路由
const staticRoutes: RouteRecordRaw[] = []
Object.keys(moduleRoutes).forEach((key: string) => {
  (moduleRoutes[key] as moduleRouteType).default && staticRoutes.push((moduleRoutes[key] as moduleRouteType).default)
})

// console.log('staticRoutes', staticRoutes);
export const staticRouteApi = (router: Router) => {
  let fullPath = true
  // 路由鉴权
  router.beforeEach(async (to: any, from: any, next: any) => {
    const token = localStorage.getItem('token');
    // 菜单仓库
    const menuStore = useMenuStore()
    if (token) {
      if (to.path === "/login") {
        next(from.fullPath)
      } else {
        if (menuStore.menuList && menuStore.WorkbenchList) {
          next()
        } else {
          await menuStore.getMenuList()
          await menuStore.getWorkbenchBase()
          if (fullPath) {
            staticRoutes.forEach((key: RouteRecordRaw) => {
              router.addRoute(key)
            })
          }
          fullPath = false
          next(to.fullPath)
        }
      }
    } else {
      if (to.path === "/login") {
        next()
      } else {
        next("/login")
      }
    }
  })
}
