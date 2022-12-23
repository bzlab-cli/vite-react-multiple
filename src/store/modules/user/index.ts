import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { login as fetchLogin, userInfo } from '@/api/auth/user'
import { getMenuGrantByRoleId } from '@/api/auth/role'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { setRoutes } from '../permission'
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

// 使用
// useEffect(() => {
//   dispatch(login({ account: '', password: '' }))
// }, [])

export const login = createAsyncThunk('user/login', async (params, thunk) => {
  const { data, retCode, retMsg } = await fetchLogin(params)
  if (retCode !== 200) return message.error(retMsg)
  thunk.dispatch(userSlice.actions.login(data))
})

export const getUserInfo = createAsyncThunk('user/getUserInfo', async (params, thunk) => {
  const { data, retCode, retMsg } = await userInfo()
  if (retCode !== 200) return message.error(retMsg)
  thunk.dispatch(userSlice.actions.getUserInfo(data))
})

export const getMenu = createAsyncThunk('user/getMenu', async (params, thunk) => {
  const { data, retCode, retMsg } = await getMenuGrantByRoleId(params)
  if (retCode !== 200) return message.error(retMsg)
  thunk.dispatch(userSlice.actions.getMenu(data))
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<any>) {
      const { token } = action.payload
      if (token) {
        setToken(token)
        state.token = token
      }
    },
    getUserInfo(state, action: PayloadAction<any>) {
      const data = action.payload
      state.name = data?.account || ''
      state.avatar = data?.headUrl || ''
      state.userId = data?.userId || ''
      state.roleId = data?.roleId || ''
      state.roleName = data?.roleName || ''
      state.loadUserInfo = true
    },
    getMenu(state, action: PayloadAction<any>) {
      const data = action.payload
      setRoutes(data)
    },
    loginOut(state) {
      removeToken()
      state.token = ''
      state.userId = ''
      state.loadUserInfo = false
    }
  }
})

export const { loginOut } = userSlice.actions

export default userSlice.reducer
