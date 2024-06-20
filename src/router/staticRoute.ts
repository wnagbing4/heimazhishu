import type { RouteRecordRaw } from "vue-router";

export const StaticRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/",
    name: "Home",
    redirect:"/workbench",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "workbench",
        name: "Workbench",
        component: () => import("@/views/workbench/index.vue")
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/404/index.vue")
  },
  // {
  //   path:'/table',
  //   component:()=>import('@/views/table.vue')
  // }
]
