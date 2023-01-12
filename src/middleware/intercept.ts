import { useEffect, useState } from 'react'
import { MiddlewareWithType } from './index'
import { useNavigate, useLocation } from 'react-router-dom'
import { getStoreState, useStoreDispatch } from '@/store'
import { getUserInfo } from '@/store/modules/user'

export const interceptLogin = ({ children }: MiddlewareWithType) => {
  const store = getStoreState()
  const location = useLocation()
  const dispatch = useStoreDispatch()
  const navigate = useNavigate()
  const { pathname } = location
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

  useEffect(() => {
    if (!isAdmin) {
      navigate('/404', {
        replace: true
      })
    }
  }, [isAdmin])

  return isAdmin ? children : null
}
