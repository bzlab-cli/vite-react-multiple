/*
 * @Description: 登录路由
 * @Author: jrucker
 * @Date: 2022-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/14 18:16:22
 */
import { lazy } from 'react'
import { interceptLogin, interceptRouter } from '@/middleware/intercept'
import { MiddlewareType } from '@/middleware'
import Layout from '@/layout'
import lazyComponent from '@/utils/lazy'

const SystemRouter = [
  {
    path: '/system',
    element: <Layout />,
    redirect: 'noredirect',
    middleware: [interceptLogin, interceptRouter] as MiddlewareType[],
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
        }
      }
    ]
  }
]

export default SystemRouter
