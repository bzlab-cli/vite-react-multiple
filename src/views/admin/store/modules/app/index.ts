import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getCollapsed, setCollapsed } from '@/utils/auth'
import { AppThunk } from '@/views/admin/store'

export type Theme = 'dark' | 'light'
export interface AppState {
  collapsed: boolean
  selectedKeys: string[]
  openKeys: string[]
  breadcrumb: Router.RouteRecordRaw[]
  size: string
  theme: Theme
  language: string
}

const initialState: AppState = {
  collapsed: getCollapsed() === 'collapsed',
  selectedKeys: [],
  openKeys: [],
  breadcrumb: [],
  size: 'middle',
  theme: 'dark',
  language: 'zh'
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleCollapsed(state, { payload }: PayloadAction<boolean>) {
      state.collapsed = payload
      setCollapsed(payload ? 'collapsed' : 'opened')
    },
    setSelectedKeys: (state, { payload }: PayloadAction<string[]>) => {
      state.selectedKeys = payload
    },
    setOpenKeys: (state, { payload }: PayloadAction<string[]>) => {
      state.openKeys = payload
    },
    setBreadcrumb: (state, { payload }: PayloadAction<Router.RouteRecordRaw[]>) => {
      state.breadcrumb = payload
    }
  }
})

export const incrementAsync =
  (val: boolean): AppThunk =>
  (dispatch, state) => {
    console.log('incrementAsync val', val)
    console.log('incrementAsync state', state)
    dispatch(toggleCollapsed(true))
  }

const { actions, reducer } = appSlice

export const { toggleCollapsed, setSelectedKeys, setOpenKeys, setBreadcrumb } = actions
export default reducer
