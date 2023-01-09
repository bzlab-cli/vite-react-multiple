/*
 * @Description: 登录路由
 * @Author: jrucker
 * @Date: 2022-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/09 14:18:38
 */
import { Navigate } from 'react-router-dom'

const OtherRouter = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
    meta: {
      hidden: true
    }
  }
]
export default OtherRouter
