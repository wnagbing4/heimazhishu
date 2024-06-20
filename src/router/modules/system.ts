
export default {
  path:"/system",
  name: "System",
  redirect:"/system/employee",
  component: () => import("@/layout/index.vue"),
  children: [
    {
      path:"employee",
      name:"Employee",
      component: () => import("@/views/system/employee/index.vue")
    },
    {
      path:"permission",
      name:"Permission",
      component: () => import("@/views/system/permission/index.vue")
    }
  ]
}
