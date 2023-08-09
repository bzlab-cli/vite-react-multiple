import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getStoreState, useStoreDispatch } from '@/views/screen/store'
import { getUserInfo } from '@/views/screen/store/modules/user'
import { getMenu } from '@/views/screen/store/modules/permission'
import { whitePathList, whiteNameList } from '@/config/whitelist'
import { getMatchRoute, addRedirectRoute } from '@/utils/permission'
import { addRouteMiddleware, asyncRoutes, routes } from '@/views/screen/router'
import { layoutSettings } from '@/config/settings'
import { useRoutes } from 'react-router-dom'

export const RouterMiddleware = () => {
  const store = getStoreState()
  const authRoutes = store.permission.authRoutes

  let routeMiddleware = []
  // 判断是否显示权限路由
  if (layoutSettings.showScreenAuthMenu) {
    routeMiddleware = addRedirectRoute('screen', addRouteMiddleware(authRoutes), authRoutes)
  } else {
    routeMiddleware = addRedirectRoute('screen', addRouteMiddleware(asyncRoutes), routes)
  }

  return useRoutes(routeMiddleware)
}

const Permission = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation()
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
      window.location.href = '/'
    }
  }

  useEffect(() => {
    beforeEach()
  }, [pathname])

  return next ? props.children : null
}

export default Permission
