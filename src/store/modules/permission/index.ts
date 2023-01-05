import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { filter } from '@/utils'
import { filterAsyncRouter } from '@/utils/permission'
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

export const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
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
      const accessedRoutes = filterAsyncRouter(filterRoutes, Layout)
      accessedRoutes.push({ path: '/:pathMatch(.*)', redirect: '/404', meta: { hidden: true } })

      state.routes = constantRoutes.concat(accessedRoutes) // 路由菜单
      state.dynamicRoutes = accessedRoutes // 动态路由
      state.accessedCodes = accessedCodes // 按钮权限
      state.cachedViews = cachedViews // 缓存路由

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

export const { setRoutes, removeCacheView } = permissionSlice.actions

export default permissionSlice.reducer
