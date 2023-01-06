/*
 * @Description: 登录路由
 * @Author: jrucker
 * @Date: 2022-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/06 14:34:15
 */
import { lazy } from 'react'

const LoginRouter = [
  {
    path: '/login',
    element: lazy(() => import('@/views/login')),
    meta: {
      title: '登录',
      hidden: true
    }
  }
]
export default LoginRouter
