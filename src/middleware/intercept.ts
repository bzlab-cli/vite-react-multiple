import { useEffect, useState } from 'react'
import { MiddlewareWithType } from './index'
import { useNavigate, useLocation } from 'react-router-dom'
import { getStoreState, useStoreDispatch } from '@/store'
import { getUserInfo } from '@/store/modules/user'
import { whitePathList, whiteNameList } from '@/config/whitelist'
import { routes } from '@/router'
import { getMatchRoute } from '@/utils/permission'

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

export const interceptLogin = ({ children }: MiddlewareWithType) => {
  const store = getStoreState()
  const location = useLocation()
  const dispatch = useStoreDispatch()
  const navigate = useNavigate()
  const { pathname } = location

  console.log('matchRoutes1', getMatchRoute(pathname, routes))
  console.log('location', location)

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
  // const navigate = useNavigate()
  const [next, setNext] = useState(false)

  // const isAdmin = item.name === 'dashboard'

  const beforeEach = () => {
    if (store.user.roleId === 'ad') {
      setNext(true)
    } else {
      // store.permission.accessedCodes
    }
  }

  useEffect(() => {
    beforeEach()
    // if (!isAdmin) {
    //   navigate('/404', {
    //     replace: true
    //   })
    // }
  }, [])

  return next ? children : null
}
