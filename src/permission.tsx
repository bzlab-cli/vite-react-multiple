/*
 * @Author: jrucker
 * @Description: 权限
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/12/23 18:37:17
 */

// import { useLocation, Navigate } from 'react-router-dom'
// import { getRoute } from '@/utils/permission'
// import { rootRouter } from '@/router'
// import { store } from '@/store'

// const permission = (props: { children: JSX.Element }) => {
//   const { pathname } = useLocation()
//   const route = getRoute(pathname, rootRouter)
//   if (!route.meta?.requiresAuth) return props.children

//   const token = store.getState().user.token
//   if (!token) return <Navigate to="/login" replace />

//   const dynamicRouter = store.getState().auth.authRouter
//   const staticRouter = ['/login', '/404']
//   const routerList = dynamicRouter.concat(staticRouter)
//   if (routerList.indexOf(pathname) == -1) return <Navigate to="/404" />

//   // * 当前账号有权限返回 Router，正常访问页面
//   return props.children
// }

// export default permission

import { useRoutes } from 'react-router-dom'
import { useLocation, matchRoutes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { routes } from './router/routes'

export const ConstantRoutes: any[] = [
  { path: '/login', element: <Login /> },
  { path: '/initAdmin', element: <InitAdmin /> }
]

// fine-admin
// gganbu-admin-FE

// store.getState().userReducer;

// // store
// fine-admin
// vite-react-admin2
// vite-react-ts-admin

export const createRoutesWrapper = (permissionRoutes: any[]): any[] => {
  return [
    ...ConstantRoutes,
    {
      path: '/',
      icon: <House />,
      element: <BasicLayout />,
      children: [
        {
          path: '/redirect/*',
          hidden: true,
          element: <Redirect />
        },
        ...permissionRoutes
      ],
      hidden: true
    }
  ]
}

export const createAuthRoutes = (routeAuth: string[]): any[] => {
  return routes.reduce((acc: IRoute[], route: IRoute) => {
    if (route.path == '*') {
      acc.push(route)
      return acc
    }
    if (route.children) {
      const newChildren = route.children?.filter(i => routeAuth.includes(i.path))
      if (newChildren.length) {
        acc.push({ ...route, children: newChildren })
      }
      return acc
    }
    if (!routeAuth.includes(route.path)) return acc
    acc.push(route)
    return acc
  }, [])
}

export const Permission = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { tags, setTags } = useTagContext()
  const { user, setUser } = useUserContext()

  const routeAuth = user?.roleInfo?.routeAuth || []
  const username = user?.username

  const authRoutes = username != 'admin' ? createAuthRoutes(routeAuth) : routes

  const authRoutesWrapper = createRoutesWrapper(authRoutes)
  console.log(authRoutes, authRoutesWrapper, '看看对应的路由')
  const Element = useRoutes(authRoutesWrapper as any)

  const { pathname } = location

  const getStaffByToken = async () => {
    try {
      const res: unknown = await StaffApi.getStaffByToken()
      console.log(res, '看看返回的信息，getStaffByToken')
      setUser(res)
    } catch (error) {
      localStorage.removeItem('accessToken')
      navigate('/login')
      console.log(error)
    }
  }

  const routerBeforeEach = async () => {
    try {
      NProgress.start()

      if (!localStorage.getItem('accessToken')) {
        // 常量的白名单
        if (ConstantRoutes.find(item => item.path == pathname)) {
          return
        }
        return navigate('/login')
      }
      console.log(user, '有用户信息吗')
      if (!user._id) {
        await getStaffByToken()
      }
      const matched = matchRoutes(authRoutesWrapper as any, location)
      console.log('matched', matched)
      if (!matched) {
        console.log('no matched')
        return navigate('/')
      }

      const matchRoute: IRoute = matched[matched.length - 1]?.route
      if (!matchRoute.hidden && !tags.find(i => i.path == matchRoute.path)) {
        setTags([...tags, matchRoute])
      }
    } catch (error) {
      console.log(error, 1111)
    } finally {
      NProgress.done()
    }
  }

  useEffect(() => {
    console.log(location.pathname, 'pathname 换了')
    routerBeforeEach()
  }, [location.pathname])

  console.log(user, 19191, 'user')
  return Element
}
