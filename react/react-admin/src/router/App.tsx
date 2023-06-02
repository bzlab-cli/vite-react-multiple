import type { RouteObject } from 'react-router-dom'
import { layoutRoutes } from './utils/helper'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import Layout from '@/layouts'
import Login from '@/pages/login'
import DataScreen from '@/pages/dataScreen'

console.log('routes11', routes)

// 自动生成路径转换为layout嵌套路径
const layouts = layoutRoutes(routes)
console.log('layouts', layouts)

const newRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <Login />
  },
  {
    path: '',
    element: <Layout />,
    children: layouts
  },
  {
    path: 'dataScreen',
    element: <DataScreen />
  }
]

function App() {
  return <>{useRoutes(newRoutes)}</>
}

export default App
