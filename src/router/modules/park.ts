
export default {
  path: "/park",
  name: "Park",
  redirect:"/park/building",
  component: () => import("@/layout/index.vue"),
  children:[
    {
      path:"building",
      name:"Building",
      component: () => import("@/views/park/building/index.vue")
    },
    {
      path:"enterprise",
      name:"Enterprise",
      component: () => import("@/views/park/enterprise/index.vue")
    }
  ]
}
