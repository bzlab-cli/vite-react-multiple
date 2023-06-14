import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getStoreState, useStoreDispatch } from '@/views/admin/store'
import { getUserInfo } from '@/views/admin/store/modules/user'
import { getMenu } from '@/views/admin/store/modules/permission'
import { whitePathList, whiteNameList } from '@/config/whitelist'
import { getMatchRoute, filterAuthRoutes, addRedirectRoute } from '@/utils/permission'
import { addRouteMiddleware, asyncRoutes, routes } from '@/views/admin/router'
import { useRoutes } from 'react-router-dom'

export const RouterMiddleware = () => {
  const store = getStoreState()
  const routeCodes = store.permission.routeCodes
  const authRoutes = filterAuthRoutes(routeCodes, asyncRoutes)
  // 权限路由
  // const routeMiddleware = addRedirectRoute(addRouteMiddleware(authRoutes), routes)

  // 本地路由
  const routeMiddleware = addRedirectRoute(addRouteMiddleware(asyncRoutes), routes)

  console.log('authRoutes', authRoutes)
  console.log('routeMiddleware', routeMiddleware)
  return useRoutes(routeMiddleware) // 权限路由
}

const Permission = (props: { children: JSX.Element }) => {
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

export default Permission
