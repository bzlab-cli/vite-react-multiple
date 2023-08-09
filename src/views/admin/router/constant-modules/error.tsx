/*
 * @Description: 路由菜单
 * @Author: jrucker
 * @Date: 2022-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2023/08/08 15:41:29
 */
import { lazy } from 'react'
const NotFound = lazy(() => import('@/views/admin/error/404'))

const ErrorRouter: Router.RouteRecordRaw[] = [
  {
    path: '/404',
    element: <NotFound />,
    meta: {
      title: '404',
      hidden: true
    }
  }
]
export default ErrorRouter
