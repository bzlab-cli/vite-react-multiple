import { AnyAction } from 'redux'
import produce from 'immer'
import { MenuMutationTypes } from './types'

export interface MenuState {
  isCollapse: boolean
  menuList: Menu.MenuOptions[]
}

const menuState: MenuState = {
  isCollapse: false,
  menuList: []
}

const menu = (state: MenuState = menuState, action: AnyAction) =>
  produce(state, state => {
    switch (action.type) {
      case MenuMutationTypes.UPDATE_COLLAPSE:
        state.isCollapse = action.isCollapse
        break
      case MenuMutationTypes.SET_MENU_LIST:
        state.menuList = action.menuList
        break
      default:
        return state
    }
  })

export default menu
