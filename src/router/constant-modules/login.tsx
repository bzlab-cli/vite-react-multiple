/*
 * @Description: 路由菜单
 * @Author: jrucker
 * @Date: 2022-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/19 22:17:00
 */
import { lazy } from 'react'
const Login = lazy(() => import('@/views/login'))

const LoginRouter = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录',
      hidden: true
    }
  }
]

export default LoginRouter
