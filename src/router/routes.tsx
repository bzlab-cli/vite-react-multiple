import { Navigate } from 'react-router-dom'
import { lazy } from 'react'
import { HomeOutlined } from '@ant-design/icons'
import Layout from '@/layout'

const Dashboard = lazy(() => import('@/views/dashboard'))
// const NotFound = lazy(() => import('@/views/error/404'))

export const routes = [
  { path: '/', element: <Navigate to="/dashboard" replace />, hidden: true },
  {
    path: '/dashboard',
    title: '首页',
    element: <Layout />,
    icon: <HomeOutlined />,
    children: [
      {
        path: '/dashboard',
        title: '首页',
        element: <Dashboard />
      }
    ]
  }
  // { path: '*', title: 'Not Found', hidden: true, element: <NotFound /> }
]
