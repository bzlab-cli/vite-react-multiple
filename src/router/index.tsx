// import { Navigate, useRoutes } from 'react-router-dom'
// import Login from '@/views/login/index'

// const metaRouters = import.meta.globEager('./modules/*.tsx')

// export const routerArray: Array<Router.RouteRecordRaw> = []
// Object.keys(metaRouters).forEach(item => {
//   Object.keys(metaRouters[item]).forEach((key: any) => {
//     routerArray.push(...metaRouters[item][key])
//   })
// })

// export const rootRouter: Array<Router.RouteRecordRaw> = [
//   {
//     path: '/',
//     element: <Navigate to="/login" />
//   },
//   {
//     path: '/login',
//     element: <Login />,
//     meta: {
//       requiresAuth: false,
//       title: '登录页',
//       key: 'login'
//     }
//   },
//   ...routerArray,
//   {
//     path: '*',
//     element: <Navigate to="/404" />
//   }
// ]

// const RenderRouter = () => {
//   const element = useRoutes(rootRouter)
//   return element
// }

// export default RenderRouter

const constantFiles = import.meta.globEager('./constant-modules/*.tsx')
let constantModules = []

Object.keys(constantFiles).forEach(key => {
  constantModules = constantModules.concat(constantFiles[key].default)
})

const asyncFiles = import.meta.globEager('./async-modules/*.tsx')
let permissionModules = []

Object.keys(asyncFiles).forEach(key => {
  permissionModules = permissionModules.concat(asyncFiles[key].default)
})

export const constantRoutes = [...constantModules]

export const asyncRoutes = [...permissionModules]

export const routes = [...constantModules, ...permissionModules]
