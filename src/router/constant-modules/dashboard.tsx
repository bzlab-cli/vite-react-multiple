/*
 * @Description: 登录路由
 * @Author: jrucker
 * @Date: 2023/01/12 17:00:45
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/14 18:17:14
 */
import { lazy } from 'react'
// import { MiddlewareType } from '@/middleware'
// import { interceptLogin, interceptRouter } from '@/middleware/intercept'
import Layout from '@/layout'
import lazyComponent from '@/utils/lazy'

const DashboardRouter = [
  {
    path: '/dashboard',
    element: <Layout />,
    redirect: 'noredirect',
    // middleware: [interceptLogin, interceptRouter] as MiddlewareType[],
    meta: {
      title: '首页',
      icon: 'HomeOutlined'
    },
    children: [
      {
        path: '/dashboard/index',
        name: 'dashboard-index',
        element: lazyComponent(lazy(() => import('@/views/dashboard'))),
        meta: {
          title: '首页',
          icon: 'HomeOutlined'
        }
      }
    ]
  }
]

export default DashboardRouter
