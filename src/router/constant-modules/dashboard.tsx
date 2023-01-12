/*
 * @Description: 登录路由
 * @Author: jrucker
 * @Date: 2023/01/12 17:00:45
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/12 18:20:08
 */
import { lazy } from 'react'
import { HomeOutlined } from '@ant-design/icons'
import { MiddlewareType } from '@/middleware'
import { interceptLogin, interceptRouter } from '@/middleware/intercept'
const Layout = lazy(() => import('@/layout'))
const Dashboard = lazy(() => import('@/views/dashboard'))

const DashboardRouter = [
  {
    element: <Layout />,
    name: 'Layout',
    middleware: [interceptLogin, interceptRouter] as MiddlewareType[],
    meta: {
      title: '首页',
      icon: <HomeOutlined />
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // isExact: true,
        element: <Dashboard />,
        meta: {
          title: '首页',
          icon: <HomeOutlined />
        }
      }
    ]
  }
]

export default DashboardRouter
