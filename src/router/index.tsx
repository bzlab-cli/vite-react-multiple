import { useRoutesWithMiddleware } from '@/middleware'

const constantFiles = import.meta.globEager('./constant-modules/*.tsx')
let constantModules = []

Object.keys(constantFiles).forEach(key => {
  constantModules = constantModules.concat(constantFiles[key].default)
})

const asyncFiles = import.meta.globEager('./async-modules/*.tsx')
let asyncModules = []

Object.keys(asyncFiles).forEach(key => {
  asyncModules = asyncModules.concat(asyncFiles[key].default)
})

export const constantRoutes = [...constantModules]

export const asyncRoutes = [...asyncModules]

export const routes = [...constantModules, ...asyncModules]

export const RouterMiddleware = () => {
  // const routes: RouteObjectWithMiddleware[] = [
  //   {
  //     element: <Layout />,
  //     middleware: [interceptLogin, interceptRouter] as MiddlewareType[],
  //     meta: {
  //       title: '2222'
  //     },
  //     children: [
  //       {
  //         path: '/dashboard',
  //         element: <Dashboard />
  //       }
  //     ]
  //   },
  //   {
  //     path: '/',
  //     element: <Navigate to="/dashboard" replace />
  //   },
  //   {
  //     path: '/login',
  //     element: <Login />
  //   },
  //   {
  //     path: '/404',
  //     element: <NotFound />
  //   }
  // ]

  return useRoutesWithMiddleware(routes)
}
