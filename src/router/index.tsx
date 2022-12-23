import { Navigate, useRoutes } from 'react-router-dom'
import Login from '@/views/login/index'

const metaRouters = import.meta.globEager('./modules/*.tsx')

export const routerArray: Array<Router.RouteRecordRaw> = []
Object.keys(metaRouters).forEach(item => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key])
  })
})

export const rootRouter: Array<Router.RouteRecordRaw> = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: '登录页',
      key: 'login'
    }
  },
  ...routerArray,
  {
    path: '*',
    element: <Navigate to="/404" />
  }
]

const RenderRouter = () => {
  const element = useRoutes(rootRouter)
  return element
}

export default RenderRouter
