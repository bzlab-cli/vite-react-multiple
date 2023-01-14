import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getCollapsed, setCollapsed } from '@/utils/auth'
import { AppThunk } from '@/store'

export interface AppState {
  collapsed: boolean
  selectedKeys: string
  openKeys: string[]
  breadcrumb: string[]
  size: string
  language: string
}

const initialState: AppState = {
  collapsed: getCollapsed() === 'collapsed',
  selectedKeys: 'dashboard',
  openKeys: ['dashboard'],
  breadcrumb: [],
  size: 'middle',
  language: 'zh'
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleCollapsed(state, { payload }: PayloadAction<boolean>) {
      state.collapsed = !state.collapsed
      setCollapsed(payload ? 'collapsed' : 'opened')
    },
    setSelectedKeys: (state, { payload }: PayloadAction<string>) => {
      state.selectedKeys = payload
    },
    setOpenKeys: (state, { payload }: PayloadAction<string[]>) => {
      state.openKeys = payload
    },
    setBreadcrumb: (state, { payload }: PayloadAction<string[]>) => {
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
