// 嵌套路由
// const routes = [
//   {
//     path: '/main/',
//     component: () => import('./index.vue'),
//     children: [
//       {
//         path: '/main/enter',
//         name: 'mainEnter',
//         component: () => import('./children/enter.vue')
//       },
//       {
//         path: '/main/config',
//         name: 'mainConfig',
//         component: () => import('./children/config.vue')
//       },
//     ]
//   }
// ]

const routes = [
  {
    path: '/main/enter',
    name: 'mainEnter',
    component: () => import('./children/enter.vue')
  },
  {
    path: '/main/config',
    name: 'mainConfig',
    component: () => import('./children/config.vue')
  },
]

export default routes
