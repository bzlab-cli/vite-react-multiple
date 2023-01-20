/*
 * @Description: 路由菜单
 * @Author: jrucker
 * @Date: 2022-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/20 16:26:00
 */
import { lazy } from 'react'
const NotFound = lazy(() => import('@/views/error/404'))

const ErrorRouter: Router.RouteRecordRaw[] = [
  {
    path: '/404',
    element: <NotFound />,
    meta: {
      title: '404',
      hidden: true
    }
  },
  {
    path: '*',
    element: <NotFound />,
    meta: {
      title: '404',
      hidden: true
    }
  }
]
export default ErrorRouter
