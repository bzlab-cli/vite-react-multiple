/*
 * @Description: 路由菜单
 * @Author: jrucker
 * @Date: 2023/01/12 17:00:45
 * @LastEditors: jrucker
 * @LastEditTime: 2023/05/26 18:26:59
 */
import { lazy } from 'react'
import Layout from '@/layout/screen'
import lazyComponent from '@/utils/lazy'

const ScreenRouter: Router.RouteRecordRaw[] = [
  {
    path: '/dashboard',
    element: <Layout />,
    redirect: 'noredirect',
    children: [
      {
        path: '/dashboard/index',
        name: 'dashboard-index',
        element: lazyComponent(lazy(() => import('@/views/screen/dashboard'))),
        meta: {
          title: '首页',
          subTitle: 'home',
          icon: 'HomeOutlined'
        }
      }
    ]
  },
  {
    path: '/dashboard1',
    element: <Layout />,
    redirect: 'noredirect',
    children: [
      {
        path: '/dashboard1/index',
        name: 'dashboard1-index',
        element: lazyComponent(lazy(() => import('@/views/screen/dashboard'))),
        meta: {
          title: '首页1',
          subTitle: 'home1',
          icon: 'HomeOutlined'
        }
      }
    ]
  }
]

export default ScreenRouter
