/*
 * @Description: 登录路由
 * @Author: jrucker
 * @Date: 2022-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/09 14:58:14
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
