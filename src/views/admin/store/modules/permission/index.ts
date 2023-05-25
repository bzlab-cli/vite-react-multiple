import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { filter } from '@/utils'
import { getMenuGrantByRoleId } from '@/api/auth/role'
import { message } from 'antd'
import { getStoreState } from '@/views/admin/store'

export interface PermissionState {
  buttonCodes: string[] // 按钮权限数据
  routeCodes: string[] // 路由权限数据
  cachedViews: (string | undefined)[] // 缓存路由
}

const initialState: PermissionState = {
  buttonCodes: [],
  routeCodes: [],
  cachedViews: []
}

export const getMenu = () => async dispatch => {
  const store = getStoreState()
  const roleId = store.user.roleId
  const { data, retCode, retMsg } = await getMenuGrantByRoleId({ roleId })
  if (retCode !== 200) return message.error(retMsg)
  dispatch(actions.setRoutes(data))
}

export const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setRoutes(state, { payload }: PayloadAction<any[]>) {
      const routes = payload
      const buttonCodes: any[] = []
      filter(routes, item => {
        if (item.menuType === 3 && item.grantFlag) {
          buttonCodes.push(item.menuCode)
        }
        return true
      })

      const routeCodes = [] as any
      filter(routes, item => {
        const route = item.menuType !== 3 && item.grantFlag
        if (route && item.menuRoute !== 'Layout') {
          routeCodes.push(item.menuRoute)
        }
        return route
      })

      const cachedViews = [] as any
      filter(routes, item => {
        const cache = item.menuType !== 3 && item.cache === 1
        if (cache) {
          cachedViews.push(item.menuRoute)
        }
        return cache
      })

      state.buttonCodes = buttonCodes // 按钮权限
      state.routeCodes = routeCodes // 路由权限
      state.cachedViews = cachedViews // 缓存路由
    },
    removeCacheView(state, { payload }: PayloadAction<boolean>) {
      if (!payload) return
      const index = state.cachedViews.indexOf(payload?.toString())
      index > -1 && state.cachedViews.splice(index, 1)
    }
  }
})

const { actions, reducer } = permissionSlice

export const { setRoutes, removeCacheView } = actions
export default reducer
