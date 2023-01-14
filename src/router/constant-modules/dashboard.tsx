/*
 * @Description: 登录路由
 * @Author: jrucker
 * @Date: 2023/01/12 17:00:45
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/14 11:29:10
 */
import { lazy } from 'react'
// import { MiddlewareType } from '@/middleware'
// import { interceptLogin, interceptRouter } from '@/middleware/intercept'
const Layout = lazy(() => import('@/layout'))
const Dashboard = lazy(() => import('@/views/dashboard'))

const DashboardRouter = [
  {
    path: '/dashboard',
    element: <Layout />,
    name: 'Layout',
    // middleware: [interceptLogin, interceptRouter] as MiddlewareType[],
    meta: {
      title: '首页',
      icon: 'HomeOutlined'
    },
    children: [
      {
        path: '/dashboard/index',
        name: 'dashboard-index',
        element: <Dashboard />,
        meta: {
          title: '首页',
          icon: 'HomeOutlined'
        }
      }
    ]
  }
]

export default DashboardRouter
