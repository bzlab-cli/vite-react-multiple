/*
 * @Description: 路由菜单
 * @Author: jrucker
 * @Date: 2022-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2023/05/25 14:52:23
 */
import { Navigate } from 'react-router-dom'

const OtherRouter: Router.RouteRecordRaw[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard/index" replace />,
    meta: {
      hidden: true
    }
  }
]

export default OtherRouter
