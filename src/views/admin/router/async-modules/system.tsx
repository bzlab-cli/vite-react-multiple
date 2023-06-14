/*
 * @Description: 路由菜单
 * @Author: jrucker
 * @Date: 2022-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2023/06/14 17:12:07
 */
import Layout from '@/layout/admin'

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
        element: () => import('@/views/admin/system/user'),
        meta: {
          title: '用户管理',
          icon: 'HomeOutlined'
        }
      },
      {
        path: '/system/role',
        name: 'system-role',
        element: () => import('@/views/admin/system/role'),
        meta: {
          title: '角色管理',
          icon: 'HomeOutlined'
        }
      },
      {
        path: '/system/menu',
        name: 'system-menu',
        element: () => import('@/views/admin/system/menu'),
        meta: {
          title: '菜单管理',
          icon: 'HomeOutlined'
        }
      },
      {
        path: '/system/org',
        name: 'system-org',
        element: () => import('@/views/admin/system/org'),
        meta: {
          title: '组织管理',
          icon: 'HomeOutlined'
        }
      }
    ]
  }
]

export default SystemRouter
