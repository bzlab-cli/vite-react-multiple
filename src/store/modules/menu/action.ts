import { getMenuList } from '@/api/modules/login'
import { Dispatch } from 'react'
import { MenuMutationTypes } from './types'

export const updateCollapse = (isCollapse: boolean) => ({
  type: MenuMutationTypes.UPDATE_COLLAPSE,
  isCollapse
})

export const setMenuList = (menuList: Menu.MenuOptions[]) => ({
  type: MenuMutationTypes.SET_MENU_LIST,
  menuList
})

interface MenuProps {
  type: string
  menuList: Menu.MenuOptions[]
}

export const getMenuListActionThunk = () => {
  return async (dispatch: Dispatch<MenuProps>) => {
    const res = await getMenuList()
    dispatch({
      type: MenuMutationTypes.SET_MENU_LIST,
      menuList: (res.data as Menu.MenuOptions[]) ?? []
    })
  }
}

export const getMenuListAction = async (): Promise<MenuProps> => {
  const res = await getMenuList()
  return {
    type: MenuMutationTypes.SET_MENU_LIST,
    menuList: res.data || []
  }
}

export const getMenuListActionPromise = (): Promise<MenuProps> => {
  return getMenuList().then(res => {
    return {
      type: MenuMutationTypes.SET_MENU_LIST,
      menuList: res.data || []
    }
  })
}
