
export default {
  path: "/rod",
  name: "Rod",
  component: () => import("@/layout/index.vue"),
  redirect:"/rod/manage",
  children: [
    {
      path: "manage",
      name: "Manage",
      component: () => import("@/views/rod/manage/index.vue"),
    },
    {
      path: "warnList",
      name: "WarnList",
      component: () => import("@/views/rod/warnList/index.vue"),
    }
  ]
}
