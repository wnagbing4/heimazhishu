
export default  {
    path: '/car',
    name: 'car',
    redirect:"/car/area",
    component: () => import( '@/layout/index.vue'),
    children: [
      {
        path:"area",
        name: "Area",
        component: () => import( '@/views/car/area/index.vue'),
      },
      {
        path:"monthCard",
        name: "MonthCard",
        component: () => import( '@/views/car/monthCard/index.vue'),
      },
      {
        path:"pay",
        name: "Pay",
        component: () => import( '@/views/car/pay/index.vue'),
      },
      {
        path:"billing",
        name: "Billing",
        component: () => import( '@/views/car/billing/index.vue'),
      }
    ]
}
