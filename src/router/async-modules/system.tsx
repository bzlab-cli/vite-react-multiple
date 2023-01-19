/*
 * @Description: 路由菜单
 * @Author: jrucker
 * @Date: 2022-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/19 22:53:18
 */
import { lazy } from 'react'
import Layout from '@/layout'
import lazyComponent from '@/utils/lazy'

const SystemRouter = [
  {
    path: '/system',
    element: <Layout />,
    redirect: 'noredirect',
    meta: {
      title: '系统管理',
      icon: 'HomeOutlined'
    },
    children: [
      {
        path: '/system/user',
        name: 'system-user',
        element: lazyComponent(lazy(() => import('@/views/system/user'))),
        meta: {
          title: '用户管理',
          icon: 'HomeOutlined'
        },
        children: [
          {
            path: '/system/user/detail',
            name: 'system-user-detail',
            element: lazyComponent(lazy(() => import('@/views/dashboard'))),
            meta: {
              title: '用户管理详情',
              icon: 'HomeOutlined',
              hidden: true
            }
          }
        ]
      }
      // {
      //   path: '/system/user/detail',
      //   name: 'system-user-detail',
      //   element: lazyComponent(lazy(() => import('@/views/dashboard'))),
      //   meta: {
      //     title: '用户管理详情',
      //     icon: 'HomeOutlined',
      //     hidden: true
      //   }
      // }
    ]
  }
]

export default SystemRouter
