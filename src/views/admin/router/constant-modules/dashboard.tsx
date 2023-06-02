/*
 * @Description: 路由菜单
 * @Author: jrucker
 * @Date: 2023/01/12 17:00:45
 * @LastEditors: jrucker
 * @LastEditTime: 2023/06/01 22:41:22
 */
import Layout from '@/layout/admin'

const DashboardRouter: Router.RouteRecordRaw[] = [
  {
    path: '/dashboard',
    element: <Layout />,
    redirect: 'noredirect',
    meta: {
      title: '首页',
      icon: 'HomeOutlined',
      hidden: true
    },
    children: [
      {
        path: '/dashboard/index',
        name: 'dashboard-index',
        element: () => import('@/views/admin/dashboard'),
        meta: {
          title: '首页',
          icon: 'HomeOutlined'
        }
      }
    ]
  }
]

export default DashboardRouter
