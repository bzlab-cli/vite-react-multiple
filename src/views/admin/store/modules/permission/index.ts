import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { filter, forEachTree, updateParentSelectedStatus } from '@/utils'
import { getMenuGrantByRoleId } from '@/api/auth/role'
import { message } from 'antd'
import { getStoreState } from '@/views/admin/store'
import { filterAuthRoutes, findDataRecursive } from '@/utils/permission'
import { layoutSettings } from '@/config/settings'
import { removeToken } from '@/utils/auth'

export interface PermissionState {
  authRoutes: any[] // 权限路由数据
  buttonCodes: string[] // 按钮权限数据
  routeCodes: string[] // 路由权限数据
  cachedViews: (string | undefined)[] // 缓存路由
}

const initialState: PermissionState = {
  authRoutes: [],
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
      let routes = payload
      const buttonCodes: any[] = []
      const menuObj = routes.find(item => item.menuRoute === 'admin')
      if (menuObj && menuObj?.childTreeList?.length) {
        routes = menuObj?.childTreeList
      }
      routes = updateParentSelectedStatus(routes, { children: 'childTreeList', key: 'grantFlag' })
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
        if (cache) cachedViews.push(item.menuRoute)
        return cache
      })

      const filterRoutes = filter(routes, item => item.grantFlag)
      const authRoutes = filterAuthRoutes(routeCodes, filterRoutes)
      const forEachTreeSortOptions = { id: 'id', children: 'children' }
      const forEachTreeSort = item => {
        const itemNode = findDataRecursive(filterRoutes, item.path, { children: 'childTreeList', key: 'menuUrl' })
        item.sort = itemNode ? itemNode.menuSort : 0
        if (itemNode?.menuName) {
          item.meta.title = itemNode.menuName
        }
      }

      forEachTree(authRoutes, forEachTreeSort, forEachTreeSortOptions)
      state.authRoutes = authRoutes
      state.buttonCodes = buttonCodes // 按钮权限
      state.routeCodes = routeCodes // 路由权限
      state.cachedViews = cachedViews // 缓存路由
      if (layoutSettings.showAdminAuthMenu && !state.authRoutes.length) {
        message.warning('当前用户没有菜单权限，请先配置')
        removeToken()
      }
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
