/*
 * @Author: jrucker
 * @Description: 权限
 * @Date: 2022/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/06 16:26:41
 */
import { useRoutes } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useLocation, matchRoutes, useNavigate } from 'react-router-dom'
import { useEffect, lazy } from 'react'
import { routes } from './router/routes'
import { getStoreState, useStoreDispatch } from '@/store'
import { getUserInfo, loginOut } from '@/store/modules/user'
// import { HomeOutlined } from '@ant-design/icons'
import { message } from 'antd'
import { whiteList, whiteNameList } from '@/config/whitelist'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// const Layout = lazy(() => import('@/layout'))
const Login = lazy(() => import('@/views/login'))
// const Dashboard = lazy(() => import('@/views/dashboard'))
const NotFound = lazy(() => import('@/views/error/404'))

;(window as any).store = getStoreState

export const constantRoutes: any[] = [
  { path: '/login', element: <Login /> },
  // { path: '/dashboard', element: <Dashboard /> },
  {
    path: '*',
    element: <NotFound />,
    hidden: true
  }
]

// fine-admin
// gganbu-admin-FE

// store
// fine-admin
// vite-react-admin2
// vite-react-ts-admin

// export const createRoutesWrapper = (permissionRoutes: any[]): any[] => {
//   return [
//     ...constantRoutes,
//     {
//       path: '/',
//       icon: <HomeOutlined />,
//       element: <Layout />,
//       children: [...permissionRoutes],
//       hidden: true
//     }
//   ]
// }

// export const createAuthRoutes = (authRoutes: string[]): any[] => {
//   return routes.reduce((acc: any[], route: any) => {
//     if (route.path == '*') {
//       acc.push(route)
//       return acc
//     }
//     if (route.children) {
//       const children = route.children?.filter(i => authRoutes.includes(i.path))
//       if (children.length) {
//         acc.push({ ...route, children })
//       }
//       return acc
//     }
//     if (!authRoutes.includes(route.path)) return acc
//     acc.push(route)
//     return acc
//   }, [])
// }

export const Permission = () => {
  const store = getStoreState()
  const dispatch = useStoreDispatch()
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()

  console.log('pathname', pathname)

  console.log('routes', routes)

  // const routeAuth = [
  //   '/dashboard/console',
  //   '/dashboard',
  //   '/staff',
  //   '/staff/staffInfo',
  //   '/staff/roleInfo',
  //   '/logger',
  //   '/logger/login'
  // ]
  // createAuthRoutes(routeAuth)

  // const authRoutes = routes

  // const authRoutesWrapper = createRoutesWrapper(authRoutes)
  // console.log('看看对应的路由', authRoutes, authRoutesWrapper)

  const authRoutesWrapper = [
    ...constantRoutes,
    ...routes
    // {
    //   path: '/',
    //   icon: <HomeOutlined />,
    //   element: <Layout />,
    //   children: [...routes],
    //   hidden: true
    // }
  ]

  const element = useRoutes(authRoutesWrapper)
  console.log('element', element)

  const beforeEach = async () => {
    try {
      NProgress.start()
      console.log('constantRoutes', constantRoutes)

      if (whiteList.indexOf(pathname) !== -1 || whiteNameList.indexOf(pathname) !== -1) {
        navigate(pathname)
      } else {
        if (store.user.token) {
          if (!store.user.loadUserInfo) {
            await dispatch(getUserInfo())
            // await dispatch(getMenu())
          } else {
            navigate(pathname)
          }
        } else {
          return navigate('/login')
        }
      }

      // if (!store.user.token) {
      //   // if (constantRoutes.find(item => item.path == pathname)) {
      //   //   return
      //   // }
      //   return navigate('/login')
      // }
      // console.log('store.user.loadUserInfo', store.user.loadUserInfo)

      // if (!store.user.loadUserInfo) {
      //   await dispatch(getUserInfo())
      // }
      // const matched = matchRoutes(authRoutesWrapper, location)
      // console.log('matched', matched)
      // if (!matched) {
      //   console.log('no matched')
      //   return navigate('/')
      // }
    } catch (err) {
      console.error(err)
      dispatch(loginOut()).then(() => {
        message.error('登录已失效，请重新登录')
        navigate('/login')
      })
    } finally {
      NProgress.done()
    }
  }

  useEffect(() => {
    // console.log('pathname 换了', pathname)
    beforeEach()
  }, [pathname])

  return element
}
