import React from 'react'
import lazyLoad from '@/router/utils/lazy-load'
import { LayoutIndex } from '@/router/constant'

// import Layout from '@/layout/index'
// export const LayoutIndex = () => <Layout />

import Home from '@/views/home/index'
const dashboardRouter: Array<Router.RouteRecordRaw> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: 'Dashboard'
    },
    children: [
      {
        path: '/dashboard/index',
        element: lazyLoad(React.lazy(() => import('@/views/dashboard/index'))),
        meta: {
          requiresAuth: true,
          title: '首页',
          key: 'dataVisualize'
        }
      },
      {
        path: '/dashboard/home',
        // element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
        element: <Home />,
        meta: {
          requiresAuth: true,
          title: '首页',
          key: 'home'
        }
      }
    ]
  }
]

export default dashboardRouter
