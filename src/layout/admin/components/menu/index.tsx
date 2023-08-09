import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import Logo from '../logo'
import { useStoreSelector, useStoreDispatch } from '@/views/admin/store'
import { setSelectedKeys, setOpenKeys, setBreadcrumb } from '@/views/admin/store/modules/app'
import { routes } from '@/views/admin/router'
import {
  getOpenMenuKeys,
  getShowMenuList,
  getMatchRoute,
  getAllBreadcrumbList,
  routeListener
} from '@/utils/permission'
import type { MenuProps } from 'antd'
import { layoutSettings } from '@/config/settings'
import { useCache } from '@bzlab/react-keep-alive'

type MenuItem = Required<MenuProps>['items'][number]

const LayoutMenu = () => {
  const { removeCaches } = useCache()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useStoreDispatch()
  const { authRoutes } = useStoreSelector(state => state.permission)
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
    const menus = layoutSettings.showAdminAuthMenu ? authRoutes : routes
    const showMenus = getShowMenuList(menus) || []
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
    if (pathname === key) return
    const route = getMatchRoute(pathname, routes) || {}
    navigate(key)
    if (route.meta.hidden) return
    removeCaches()
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
