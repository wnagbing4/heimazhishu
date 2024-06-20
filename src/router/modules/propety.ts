
export default {
  path: "/propety",
  name: "Propety",
  redirect:"/propety/cost",
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: "cost",
      name: "Cost",
      component: () => import('@/views/propety/cost/index.vue')
    }
  ]
}
