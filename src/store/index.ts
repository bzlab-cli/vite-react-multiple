import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import appReducer from './modules/app'
import permissionReducer from './modules/permission'
import userReducer from './modules/user'

const rootReducer = combineReducers({
  app: appReducer,
  permission: permissionReducer,
  user: userReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const useStoreDispatch = () => useDispatch<RootDispatch>()
export const useStoreState = <T extends (state: RootState) => any>(selector: T): ReturnType<T> => useSelector(selector)
export const getStoreState = (): RootState => store.getState()

export const useAppDispatch: () => RootDispatch = useDispatch
// export const useAppDispatch = () => useDispatch<RootDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// 使用
// const dispatch = useAppDispatch()
// dispatch(toggleSidebar(false))

// // 拿state
// const { size } = useAppSelector(state => state.app)
