/*
 * @Description: 登录路由
 * @Author: jrucker
 * @Date: 2022-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/09 14:25:54
 */
import { lazy } from 'react'
const NotFound = lazy(() => import('@/views/error/404'))

const ErrorRouter = [
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
    hidden: true
  }
]
export default ErrorRouter
