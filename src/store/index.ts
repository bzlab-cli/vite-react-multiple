import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import appReducer from './modules/app'
import permissionReducer from './modules/permission'
import userReducer from './modules/user'

const rootReducer = combineReducers({
  app: appReducer,
  permission: permissionReducer,
  user: userReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type StoreDispatch = typeof store.dispatch
export type StoreState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, StoreState, unknown, Action<string>>

export const useStoreDispatch = () => useDispatch<StoreDispatch>()
export const useStoreSelector = <T extends (state: StoreState) => any>(selector: T): ReturnType<T> =>
  useSelector(selector)
export const getStoreState = (): StoreState => store.getState()

// export const useAppDispatch: () => StoreDispatch = useDispatch
// export const useAppDispatch = () => useDispatch<RootDispatch>()

// 使用
// const dispatch = useStoreDispatch()
// dispatch(toggleSidebar(false))

// // 拿state
// const { token } = useStoreSelector(state => state.user)
