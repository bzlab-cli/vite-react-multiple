import { AnyAction } from 'redux'
import produce from 'immer'
import { TabsMutationTypes } from './types'

export interface TabsState {
  tabsActive: string
  tabsList: any
}

const tabsState: TabsState = {
  tabsActive: '',
  tabsList: [{ title: '首页', path: '' }]
}

const tabs = (state: TabsState = tabsState, action: AnyAction) =>
  produce(state, state => {
    switch (action.type) {
      case TabsMutationTypes.SET_TABS_LIST:
        state.tabsList = action.tabsList
        break
      case TabsMutationTypes.SET_TABS_ACTIVE:
        state.tabsActive = action.tabsActive
        break
      default:
        return state
    }
  })

export default tabs
