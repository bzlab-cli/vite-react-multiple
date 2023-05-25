/*
 * @Description: 路由菜单
 * @Author: jrucker
 * @Date: 2023/01/12 17:00:45
 * @LastEditors: jrucker
 * @LastEditTime: 2023/05/25 17:36:19
 */
import { lazy } from 'react'
import Layout from '@/layout/screen'
import lazyComponent from '@/utils/lazy'

const ScreenRouter: Router.RouteRecordRaw[] = [
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
        element: lazyComponent(lazy(() => import('@/views/screen/dashboard'))),
        meta: {
          title: '首页',
          icon: 'HomeOutlined'
        }
      }
    ]
  }
]

export default ScreenRouter
