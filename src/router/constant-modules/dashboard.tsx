/*
 * @Description: 登录路由
 * @Author: jrucker
 * @Date: 2022-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/09 15:04:30
 */
import { lazy } from 'react'
import { HomeOutlined } from '@ant-design/icons'

const Layout = lazy(() => import('@/layout'))
const Dashboard = lazy(() => import('@/views/dashboard'))

const DashboardRouter = [
  {
    element: <Layout />,
    meta: {
      title: '首页',
      icon: <HomeOutlined />,
      hidden: true
    },
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
        meta: {
          title: '首页',
          icon: <HomeOutlined />,
          hidden: true
        }
      }
    ]
  }
]
export default DashboardRouter
