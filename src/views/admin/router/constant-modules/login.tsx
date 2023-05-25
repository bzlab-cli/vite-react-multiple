/*
 * @Description: 路由菜单
 * @Author: jrucker
 * @Date: 2022-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2023/05/24 17:32:46
 */
import { lazy } from 'react'
const Login = lazy(() => import('@/views/admin/login'))

const LoginRouter: Router.RouteRecordRaw[] = [
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
