/*
 * @Description: 路由菜单
 * @Author: jrucker
 * @Date: 2023/01/12 17:00:45
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/20 16:25:48
 */
import { lazy } from 'react'
import Layout from '@/layout'
import lazyComponent from '@/utils/lazy'

const DashboardRouter: Router.RouteRecordRaw[] = [
  {
    path: '/dashboard',
    element: <Layout />,
    redirect: 'noredirect',
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
