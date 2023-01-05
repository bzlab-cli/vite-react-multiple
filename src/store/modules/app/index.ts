import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getSidebarStatus, setSidebarStatus } from '@/utils/auth'
import { AppThunk } from '@/store'

export interface AppState {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  size: string
  language: string
}

const initialState: AppState = {
  sidebar: {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  },
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

export const { toggleSidebar, closeSidebar } = appSlice.actions

export default appSlice.reducer
