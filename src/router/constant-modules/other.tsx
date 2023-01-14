/*
 * @Description: 登录路由
 * @Author: jrucker
 * @Date: 2022-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/14 15:05:34
 */
import { Navigate } from 'react-router-dom'

const OtherRouter = [
  {
    path: '/',
    element: <Navigate to="/dashboard/index" replace />,
    meta: {
      hidden: true
    }
  }
]

export default OtherRouter
