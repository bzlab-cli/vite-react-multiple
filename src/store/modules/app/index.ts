import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getSidebarStatus, setSidebarStatus } from '@/utils/auth'
import { AppThunk } from '@/store'

export interface AppState {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  breadcrumb: string[]
  size: string
  language: string
}

const initialState: AppState = {
  sidebar: {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  },
  breadcrumb: [],
  size: 'middle',
  language: 'zh'
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSidebar(state, { payload }: PayloadAction<boolean>) {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = payload
      if (state.sidebar.opened) {
        setSidebarStatus('opened')
      } else {
        setSidebarStatus('closed')
      }
    },
    closeSidebar(state, { payload }: PayloadAction<boolean>) {
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = payload
      setSidebarStatus('closed')
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
    dispatch(toggleSidebar(true))
  }

export const { toggleSidebar, closeSidebar, setBreadcrumb } = appSlice.actions

export default appSlice.reducer
