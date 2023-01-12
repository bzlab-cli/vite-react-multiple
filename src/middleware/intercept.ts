import { useEffect, useState } from 'react'
import { MiddlewareWithType } from './index'
import { useNavigate, useLocation, useParams, matchRoutes, useSearchParams } from 'react-router-dom'
import { getStoreState, useStoreDispatch } from '@/store'
import { getUserInfo } from '@/store/modules/user'
import { whitePathList, whiteNameList } from '@/config/whitelist'
import { routes } from '@/router'

export const interceptWhiteList = ({ children, item }: MiddlewareWithType) => {
  const location = useLocation()
  const { pathname } = location
  const name = item.name
  const [next, setNext] = useState(false)

  const beforeEach = async () => {
    if (whitePathList.indexOf(pathname) !== -1 || whiteNameList.indexOf(name as string) !== -1) {
      setNext(true)
    }
  }

  useEffect(() => {
    beforeEach()
  }, [pathname])

  return next ? children : null
}

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: any[] = []) => {
  let result = {}
  for (const item of routes) {
    if (item.path === path) return item
    if (item.children) {
      const res = searchRoute(path, item.children)
      if (Object.keys(res).length) result = res
    }
  }
  return result
}

export const matchCurrentPageRoute = pathname => {
  const matchResult = matchRoutes(routes, pathname)

  if (!matchResult) {
    throw new Error(`匹配 (${pathname}) 路由信息异常`)
  }

  return matchResult.at(-1)
}

export const interceptLogin = ({ children }: MiddlewareWithType) => {
  const store = getStoreState()
  const location = useLocation()
  const dispatch = useStoreDispatch()
  const navigate = useNavigate()
  const { pathname } = location

  console.log('matchRoutes', matchCurrentPageRoute(pathname))

  const [searchParams] = useSearchParams()
  console.log('useSearchParams id', searchParams.get('id'))

  console.log('useParams', useParams())
  console.log('location', location)

  const route = searchRoute(pathname, routes)
  console.log('route', route)

  const [next, setNext] = useState(false)

  const beforeEach = async () => {
    if (store.user.token) {
      if (!store.user.loadUserInfo) {
        await dispatch(getUserInfo())
        setNext(true)
      } else {
        setNext(true)
      }
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    beforeEach()
  }, [pathname])

  return next ? children : null
}

export const interceptRouter = ({ children }: MiddlewareWithType) => {
  const store = getStoreState()
  const navigate = useNavigate()
  const isAdmin = store.user.roleId === 'ad'

  // const isAdmin = item.name === 'dashboard'

  useEffect(() => {
    if (!isAdmin) {
      navigate('/404', {
        replace: true
      })
    }
  }, [isAdmin])

  return isAdmin ? children : null
}
