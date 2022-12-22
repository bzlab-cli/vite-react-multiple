import React from 'react'
import lazyLoad from '@/router/utils/lazy-load'

// 错误页面模块
const errorRouter: Array<Router.RouteRecordRaw> = [
  {
    path: '/404',
    element: lazyLoad(React.lazy(() => import('@/views/error/404'))),
    meta: {
      requiresAuth: false,
      title: '404页面',
      key: '404'
    }
  }
]

export default errorRouter
