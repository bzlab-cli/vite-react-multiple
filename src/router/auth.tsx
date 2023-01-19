import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getStoreState, useStoreDispatch } from '@/store'
import { getUserInfo } from '@/store/modules/user'
import { getMenu } from '@/store/modules/permission'
import { whitePathList, whiteNameList } from '@/config/whitelist'
import { getMatchRoute, filterAuthRoutes } from '@/utils/permission'
import { addRouteMiddleware, asyncRoutes } from '@/router'
import { useRoutes } from 'react-router-dom'

// const routes = [
//   {
//     path: '/dashboard',
//     redirect: 'noredirect',
//     meta: {
//       title: '首页',
//       icon: 'HomeOutlined'
//     },
//     children: [
//       {
//         path: '/dashboard/index',
//         name: 'dashboard-index',
//         meta: {
//           title: '首页',
//           icon: 'HomeOutlined'
//         }
//       }
//     ]
//   },
//   {
//     path: '/system',
//     redirect: 'noredirect',
//     meta: {
//       title: '系统管理',
//       icon: 'HomeOutlined'
//     },
//     children: [
//       {
//         path: '/system/user',
//         name: 'system-user',
//         meta: {
//           title: '用户管理',
//           icon: 'HomeOutlined'
//         }
//       }
//     ]
//   }
// ]

// interface Route extends RouteObject {
//   path?: string
//   element?: ReactNode
//   title?: string
//   /*** for those deteil page and uncesssary for TagsBar/sideBar */
//   hidden?: boolean
//   icon?: ReactNode
//   /*** for header tags,usually only dashboard is true */
//   affix?: boolean
//   /*** whether keepAlive, usually used in those Info Page */
//   keepAlive?: boolean
// }

// export interface IRoute extends Route {
//   children?: Route[]
// }

export const RouterMiddleware = () => {
  const store = getStoreState()
  const routeCodes = store.permission.routeCodes
  const authRoutes = filterAuthRoutes(routeCodes, asyncRoutes)
  const routeMiddleware = addRouteMiddleware(authRoutes)
  return useRoutes(routeMiddleware)
}

const Auth = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useStoreDispatch()
  const route = getMatchRoute(pathname, asyncRoutes) || ({} as any)
  const store = getStoreState()
  const name = route?.name
  const [next, setNext] = useState(false)

  const beforeEach = async () => {
    if (whitePathList.indexOf(pathname) !== -1 || whiteNameList.indexOf(name as string) !== -1) {
      return setNext(true)
    }

    if (store.user.token) {
      if (!store.user.loadUserInfo) {
        await dispatch(getUserInfo())
        await dispatch(getMenu())
        return setNext(true)
      } else {
        return setNext(true)
      }
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    beforeEach()
  }, [pathname])

  return next ? props.children : null
}

export default Auth
