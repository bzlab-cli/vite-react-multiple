import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import Logo from '../logo'
import { useStoreSelector, useStoreDispatch } from '@/store'
import { setSelectedKeys, setOpenKeys, setBreadcrumb } from '@/store/modules/app'
import { routes } from '@/router'
import {
  getOpenMenuKeys,
  getShowMenuList,
  getMatchRoute,
  getAllBreadcrumbList,
  routeListener
} from '@/utils/permission'
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

const LayoutMenu = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useStoreDispatch()
  const { selectedKeys, openKeys, collapsed, theme } = useStoreSelector(state => state.app)
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    routeListener()
    if (!collapsed) {
      const keys = getOpenMenuKeys(pathname)
      dispatch(setOpenKeys(keys))
    }

    dispatch(setSelectedKeys([pathname]))
    const showMenus = getShowMenuList(routes) || []
    setMenuList(showMenus)
    setBreadcrumbList()
    setLoading(true)
  }, [pathname])

  const setBreadcrumbList = () => {
    const breadcrumbList = getAllBreadcrumbList(routes)
    const route = getMatchRoute(pathname, routes) || {}
    const matched = route?.path ?? ''
    const matchedList = breadcrumbList[matched]
    if (matchedList?.length > 1) {
      const last = matchedList[matchedList.length - 1]
      const lastSecond = matchedList[matchedList.length - 2]
      if (last?.meta?.hidden) {
        dispatch(setSelectedKeys([lastSecond?.path]))
      } else {
        dispatch(setSelectedKeys([last?.path]))
      }
    }

    dispatch(setBreadcrumb(matchedList))
  }

  const onMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  const onOpenChange = (keys: string[]) => {
    const getOpenKeys = [...new Set([...openKeys, ...(keys as string[])])]
    dispatch(setOpenKeys(getOpenKeys))
  }

  return (
    <div className="menu">
      <Logo />
      {loading && (
        <Menu
          theme={theme}
          mode="inline"
          selectedKeys={selectedKeys}
          onClick={onMenuClick}
          defaultOpenKeys={openKeys}
          onOpenChange={onOpenChange}
          items={menuList}
        />
      )}
    </div>
  )
}

export default LayoutMenu
