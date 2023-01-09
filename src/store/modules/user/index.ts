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

const initialState: UserState = {
  token: getToken() || '',
  userId: '',
  name: '',
  avatar: 'https://img2.baidu.com/it/u=3924374604,1207041510&fm=26&fmt=auto',
  roleId: '',
  roleName: '',
  loadUserInfo: false
}

export const login = params => async dispatch => {
  const { data, retCode, retMsg } = await fetchLogin(params)
  if (retCode !== 200) return message.error(retMsg)
  dispatch(userSlice.actions.login(data))
}

export const getUserInfo = () => async dispatch => {
  const { data, retCode, retMsg } = await userInfo()
  if (retCode !== 200) return message.error(retMsg)
  dispatch(userSlice.actions.getUserInfo(data))
}

export const loginOut = () => async dispatch => {
  return new Promise(resolve => {
    dispatch(userSlice.actions.loginOut({ resolve }))
  })
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, { payload }: PayloadAction<any>) {
      const { token } = payload
      if (token) {
        setToken(token)
        state.token = token
      }
    },
    getUserInfo(state, { payload }: PayloadAction<any>) {
      state.name = payload?.account || ''
      state.avatar = payload?.headUrl || ''
      state.userId = payload?.userId || ''
      state.roleId = payload?.roleId || ''
      state.roleName = payload?.roleName || ''
      state.loadUserInfo = true
    },
    loginOut(state, { payload }: PayloadAction<any>) {
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

export default userSlice.reducer
