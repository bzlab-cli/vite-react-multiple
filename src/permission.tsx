/*
 * @Author: jrucker
 * @Description: 权限
 * @Date: 2022/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/04 17:56:43
 */
import { useRoutes } from 'react-router-dom'
import { useLocation, matchRoutes, useNavigate } from 'react-router-dom'
import { useEffect, lazy } from 'react'
import { routes } from './router/routes'
import { getStoreState } from '@/store'
import { getUserInfo } from '@/store/modules/user'
import { HomeOutlined } from '@ant-design/icons'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const Layout = lazy(() => import('@/layout'))
const Login = lazy(() => import('@/views/login'))
const Dashboard = lazy(() => import('@/views/dashboard'))
const NotFound = lazy(() => import('@/views/error/404'))

export const constantRoutes: any[] = [
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <Dashboard /> }
]

// fine-admin
// gganbu-admin-FE

// store.getState().userReducer;

// // store
// fine-admin
// vite-react-admin2
// vite-react-ts-admin
;(window as any).store = getStoreState()
console.log('getStoreState', getStoreState())
console.log('routes', routes)

export const createRoutesWrapper = (permissionRoutes: any[]): any[] => {
  return [
    ...constantRoutes,
    {
      path: '/',
      icon: <HomeOutlined />,
      element: <Layout />,
      children: [
        // {
        //   path: '/redirect/*',
        //   hidden: true,
        //   element: <Redirect />
        // },
        {
          path: '*',
          element: <NotFound />,
          hidden: true
        },
        ...permissionRoutes
      ],
      hidden: true
    }
  ]
}

export const createAuthRoutes = (authRoutes: string[]): any[] => {
  return routes.reduce((acc: any[], route: any) => {
    if (route.path == '*') {
      acc.push(route)
      return acc
    }
    if (route.children) {
      const children = route.children?.filter(i => authRoutes.includes(i.path))
      if (children.length) {
        acc.push({ ...route, children })
      }
      return acc
    }
    if (!authRoutes.includes(route.path)) return acc
    acc.push(route)
    return acc
  }, [])
}

// const getStaffByToken = async navigate => {
//   try {
//     const res: unknown = await StaffApi.getStaffByToken()
//     console.log(res, '看看返回的信息，getStaffByToken')
//     setUser(res)
//   } catch (error) {
//     localStorage.removeItem('accessToken')
//     navigate('/login')
//     console.log(error)
//   }
// }

export const Permission = () => {
  const store = getStoreState()
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()

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

  const authRoutes = routes

  const authRoutesWrapper = createRoutesWrapper(authRoutes)
  console.log('看看对应的路由', authRoutes, authRoutesWrapper)

  const element = useRoutes(authRoutesWrapper)

  const beforeEach = async () => {
    try {
      NProgress.start()
      if (!store.user.token) {
        if (constantRoutes.find(item => item.path == pathname)) {
          return
        }
        return navigate('/login')
      }
      if (!store.user.loadUserInfo) {
        await getUserInfo()
      }
      const matched = matchRoutes(authRoutesWrapper, location)
      console.log('matched', matched)
      if (!matched) {
        console.log('no matched')
        return navigate('/')
      }
    } catch (err) {
      console.error(err)
    } finally {
      NProgress.done()
    }
  }

  useEffect(() => {
    console.log('pathname 换了', location.pathname)
    beforeEach()
  }, [location.pathname])

  return element
}
