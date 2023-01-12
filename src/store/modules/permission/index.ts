import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter } from '@/utils'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filterAsyncRouter } from '@/utils/permission'
import { getMenuGrantByRoleId } from '@/api/auth/role'
import { message } from 'antd'
import { getStoreState } from '@/store'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { constantRoutes, asyncRoutes } from '@/router'
// import Layout from '@/layout/index.vue'

export interface PermissionState {
  accessedCodes: string[]
  routes: Router.RouteRecordRaw[]
  dynamicRoutes: Router.RouteRecordRaw[]
  cachedViews: (string | undefined)[]
}

const initialState: PermissionState = {
  accessedCodes: [],
  routes: [],
  dynamicRoutes: [],
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setRoutes(state, { payload }: PayloadAction<any[]>) {
      const routes = payload
      const accessedCodes: any[] = []
      filter(routes, item => {
        if (item.menuType === 3 && item.grantFlag) {
          accessedCodes.push(item.menuCode)
        }
        return true
      })

      const filterRoutes = filter(routes, item => {
        return item.menuType !== 3 && item.grantFlag
      })
      const cachedViews = [] as any
      filter(routes, item => {
        const cache = item.menuType !== 3 && item.cache === 1
        if (cache) {
          cachedViews.push(item.menuRoute)
        }
        return cache
      })
      const accessedRoutes = filterAsyncRouter(filterRoutes)
      console.log('accessedRoutes', accessedRoutes)

      // accessedRoutes.push({ path: '/:pathMatch(.*)', redirect: '/404', meta: { hidden: true } })

      state.routes = constantRoutes.concat(accessedRoutes) // 路由菜单
      // state.dynamicRoutes = accessedRoutes // 动态路由
      // state.accessedCodes = accessedCodes // 按钮权限
      // state.cachedViews = cachedViews // 缓存路由

      console.log('routes', state.routes)
      console.log('dynamicRoutes', state.dynamicRoutes)
      console.log('asyncRoutes', asyncRoutes)
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
