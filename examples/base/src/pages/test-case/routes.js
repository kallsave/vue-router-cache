const routes = [
  {
    path: '/',
    redirect: '/test-case/main/enter',
  },
  {
    path: '/test-case/',
    component: () => import('./index.vue'),
    children: [
      {
        path: '/test-case/main',
        redirect: '/test-case/main/enter',
      },
      {
        path: '/test-case/main/enter',
        name: 'mainEnter',
        component: () => import('./main/enter.vue')
      },
      {
        path: '/test-case/main/config',
        name: 'mainConfig',
        component: () => import('./main/config.vue')
      },
      {
        path: '/test-case/main/number-list',
        name: 'mainNumberList',
        component: () => import('./main/number-list.vue')
      },
      {
        path: '/test-case/main/number-detail/:numberId',
        name: 'mainNumberDetail',
        component: () => import('./main/number-detail.vue')
      },
      {
        path: '/test-case/main/letter-list/:numberId',
        name: 'mainLetterList',
        component: () => import('./main/letter-list.vue')
      },
      {
        path: '/test-case/main/letter-detail/:numberId/:letterId',
        name: 'mainLetterDetail',
        component: () => import('./main/letter-detail.vue')
      },
    ]
  }
]

export default routes
