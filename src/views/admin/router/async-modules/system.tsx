/*
 * @Description: 路由菜单
 * @Author: jrucker
 * @Date: 2022-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2023/05/25 14:09:13
 */
import { lazy } from 'react'
import Layout from '@/layout/admin'
import lazyComponent from '@/utils/lazy'

const SystemRouter: Router.RouteRecordRaw[] = [
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
        element: lazyComponent(lazy(() => import('@/views/admin/system/user'))),
        meta: {
          title: '用户管理',
          icon: 'HomeOutlined'
        }
      },
      {
        path: '/system/role',
        name: 'system-role',
        element: lazyComponent(lazy(() => import('@/views/admin/system/role'))),
        meta: {
          title: '角色管理',
          icon: 'HomeOutlined'
        }
      },
      {
        path: '/system/menu',
        name: 'system-menu',
        element: lazyComponent(lazy(() => import('@/views/admin/system/menu'))),
        meta: {
          title: '菜单管理',
          icon: 'HomeOutlined'
        }
      },
      {
        path: '/system/org',
        name: 'system-org',
        element: lazyComponent(lazy(() => import('@/views/admin/system/org'))),
        meta: {
          title: '组织管理',
          icon: 'HomeOutlined'
        }
      }
    ]
  }
]

export default SystemRouter
