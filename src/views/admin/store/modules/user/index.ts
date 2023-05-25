import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { login as fetchLogin, userInfo } from '@/api/auth/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { message } from 'antd'

export interface UserState {
  token: string
  name: string
  avatar: string
  userId: string
  roleId: string
  roleName: string
  loadUserInfo: boolean
}

export const login = params => async dispatch => {
  const { data, retCode, retMsg } = await fetchLogin(params)
  if (retCode !== 200) return message.error(retMsg)
  dispatch(actions.setLogin(data))
}

export const getUserInfo = () => async dispatch => {
  const { data, retCode, retMsg } = await userInfo()
  if (retCode !== 200) return message.error(retMsg)
  dispatch(actions.setUserInfo(data))
}

export const loginOut = () => async dispatch => {
  return new Promise(resolve => {
    dispatch(actions.setLoginOut({ resolve }))
  })
}

const initialState: UserState = {
  token: getToken() || '',
  userId: '',
  name: '',
  avatar: '',
  roleId: '',
  roleName: '',
  loadUserInfo: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin(state, { payload }: PayloadAction<any>) {
      const { token } = payload
      if (token) {
        setToken(token)
        state.token = token
      }
    },
    setUserInfo(state, { payload }: PayloadAction<any>) {
      state.name = payload?.account || ''
      state.avatar = payload?.headUrl || '/images/avatar/default.png'
      state.userId = payload?.userId || ''
      state.roleId = payload?.roleId || ''
      state.roleName = payload?.roleName || ''
      state.loadUserInfo = true
    },
    setLoginOut(state, { payload }: PayloadAction<any>) {
      const { resolve } = payload
      removeToken()
      state.token = ''
      state.userId = ''
      state.loadUserInfo = false
      resolve()
      window.location.href = '/'
    }
  }
})

const { actions, reducer } = userSlice

export const { setUserInfo, setLoginOut } = actions
export default reducer
