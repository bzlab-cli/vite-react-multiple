import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
// import { useBreadcrumbFromMenu } from '../breadcrumb'
// import { useSetState } from 'ahooks'
// import { flatArrTree } from '@/utils'
// import type { SetState } from 'ahooks/es/useSetState'

import { useStoreSelector, useStoreDispatch } from '@/store'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { setSelectedKeys, setOpenKeys } from '@/store/modules/app'
import { routes } from '@/router'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getOpenMenuKeys, getShowMenuList, splitPath, getMatchRoute, getPathRoute } from '@/utils/permission'
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

const LayoutMenu = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useStoreDispatch()
  const { selectedKeys, collapsed } = useStoreSelector(state => state.app)
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const getParentRoute = () => {
    const route = getMatchRoute(pathname, routes) || {}
    return (
      routes.find((item: any) => {
        return item.path == route?.path || item?.children?.find(c => c.path == route?.path)
      }) || {}
    )
  }

  console.log('getParentRoute', getParentRoute())

  useEffect(() => {
    console.log('pathname', pathname)
    console.log('collapsed', collapsed)

    console.log('getPathRoute', getPathRoute(pathname, routes))

    if (!collapsed) {
      const openKey = getOpenMenuKeys(pathname)
      console.log('openKey', openKey)

      setOpenKeys(openKey)
      // dispatch(setOpenKeys(openKey))
    }

    dispatch(setSelectedKeys(pathname))

    const menus = getShowMenuList(routes)
    console.log('menus', menus)

    setMenuList(menus || [])
  }, [pathname])

  const onMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const onOpenChange = (openKeys: string[]) => {
  //   if (openKeys.length === 0 || openKeys.length === 1) return dispatch(setOpenKeys(openKeys))
  //   const last = openKeys[openKeys.length - 1]
  //   console.log('last', last)

  //   if (last.includes(openKeys[0])) return dispatch(setOpenKeys(openKeys))
  //   dispatch(setOpenKeys([last]))
  // }

  // const diffOpenMenu = (arr: string[], lastArr: string[]) => {
  //   let result = true
  //   for (let j = 0; j < arr.length; j++) {
  //     if (arr[j] !== lastArr[j]) {
  //       result = false
  //       break
  //     }
  //   }
  //   return result
  // }

  const onOpenChange = (keys: string[]) => {
    console.log('keys', keys)
    setOpenKeys(keys)

    // const latest = keys.find(key => !openKeys.includes(key))
    // const rootSubmenuKeys = routes.map((item: any) => (item?.children?.length && item.path) || '').filter(Boolean)
    // if (!rootSubmenuKeys.includes(latest)) {
    //   dispatch(setOpenKeys(keys))
    // } else {
    //   dispatch(setOpenKeys(latest ? [latest] : []))
    // }
    // if (!latest) return

    // const newOpenKey: string[] = []
    // let last = ''
    // if (keys.length) {
    //   last = keys[keys.length - 1]
    //   const lastArr: string[] = splitPath(last)
    //   newOpenKey.push(last)
    //   for (let i = keys.length - 2; i >= 0; i--) {
    //     const arr = splitPath(keys[i])
    //     const hasOpenKey = diffOpenMenu(arr, lastArr)
    //     if (hasOpenKey) newOpenKey.unshift(keys[i])
    //   }
    // }

    // if (keys.length === 0 || keys.length === 1) return setOpenKeys(keys)
    // const latest = keys.find(key => !openKeys.includes(key))
    // const latest = keys[keys.length - 1]
    // if (latest.includes(keys[0])) return setOpenKeys(keys)
    // setOpenKeys([latest])

    // dispatch(setOpenKeys(newOpenKey))
  }

  console.log('openKeys', openKeys)

  return (
    <Menu
      id="custom-menu-popup"
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKeys]}
      onClick={onMenuClick}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={menuList}
    />
  )
}

export default LayoutMenu
