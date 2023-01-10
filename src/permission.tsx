/*
 * @Author: jrucker
 * @Description: 权限
 * @Date: 2022/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/10 14:19:36
 */
import { useRoutes } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getStoreState, useStoreDispatch } from '@/store'
import { getUserInfo, loginOut } from '@/store/modules/user'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getMenu } from '@/store/modules/permission'
import { message } from 'antd'
import { whiteList, whiteNameList } from '@/config/whitelist'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { routes } from '@/router'
;(window as any).store = getStoreState

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

  const element = useRoutes(routes)
  const beforeEach = async () => {
    dispatch(getMenu())

    // console.log('routes', store.permission.routes)

    try {
      NProgress.start()
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
    beforeEach()
  }, [pathname])

  return element
}
