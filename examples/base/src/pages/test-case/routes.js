const routes = [
  {
    path: '/test-case/',
    component: () => import('./index.vue'),
    children: [
      {
        path: '/test-case/number-list',
        name: 'testCaseNumberList',
        component: () => import('./children/number-list.vue')
      },
      {
        path: '/test-case/number-detail/:numberId',
        name: 'testCaseNumberDetail',
        component: () => import('./children/number-detail.vue')
      },
      {
        path: '/test-case/letter-list/:numberId',
        name: 'testCaseLetterList',
        component: () => import('./children/letter-list.vue')
      },
      {
        path: '/test-case/letter-detail/:numberId/:letterId',
        name: 'testCaseLetterDetail',
        component: () => import('./children/letter-detail.vue')
      },
    ]
  }
]

export default routes
