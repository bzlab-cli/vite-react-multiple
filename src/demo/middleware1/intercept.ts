import { useEffect, useState } from 'react'
import { MiddlewareWithType } from './index'
import { useNavigate, useLocation } from 'react-router-dom'
import { getStoreState, useStoreDispatch } from '@/store'
import { getUserInfo } from '@/store/modules/user'
import { getMenu } from '@/store/modules/permission'
import { whitePathList, whiteNameList } from '@/config/whitelist'
import { routes } from '@/router'
import { getMatchRoute } from '@/utils/permission'

export const interceptWhiteList = ({ children, item }: MiddlewareWithType) => {
  const { pathname } = useLocation()
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

export function interceptLogin({ children }: MiddlewareWithType) {
  const store = getStoreState()
  const dispatch = useStoreDispatch()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [next, setNext] = useState(false)

  const beforeEach = async () => {
    if (store.user.token) {
      if (!store.user.loadUserInfo) {
        await dispatch(getUserInfo())
        await dispatch(getMenu())
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

export function interceptRouter({ children }: MiddlewareWithType) {
  const store = getStoreState()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [next, setNext] = useState(false)

  const beforeEach = async () => {
    if (store.user.roleId === 'ad') {
      setNext(true)
    } else {
      const routeCodes = store.permission.routeCodes
      const match = getMatchRoute(pathname, routes) as any
      const name = match.name ?? ''
      if (routeCodes.includes(name)) {
        setNext(true)
      } else {
        navigate('/404', {
          replace: true
        })
      }
    }
  }

  useEffect(() => {
    beforeEach()
  }, [pathname])

  return next ? children : null
}
