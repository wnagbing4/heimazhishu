import { createRouter, createWebHistory } from 'vue-router'
import { StaticRoutes } from "./staticRoute"
// 引入路由鉴权文件
import { staticRouteApi } from "./permission"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: StaticRoutes
})
staticRouteApi(router)

export default router
