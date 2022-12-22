import { TabsMutationTypes } from './types'

export const setTabsList = (tabsList: Menu.MenuOptions[]) => ({
  type: TabsMutationTypes.SET_TABS_LIST,
  tabsList
})

export const setTabsActive = (tabsActive: string) => ({
  type: TabsMutationTypes.SET_TABS_ACTIVE,
  tabsActive
})
