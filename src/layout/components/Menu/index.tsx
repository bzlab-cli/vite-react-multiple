import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import Logo from '../logo'
import { useStoreSelector, useStoreDispatch } from '@/store'
import { setSelectedKeys, setOpenKeys, setBreadcrumb } from '@/store/modules/app'
// import { routes } from '@/router'
import { getOpenMenuKeys, getShowMenuList, getMatchRoute, getAllBreadcrumbList } from '@/utils/permission'
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

const LayoutMenu = () => {
  // console.log('routes', routes)

  const routes = [
    {
      path: '/dashboard',
      redirect: 'noredirect',
      meta: {
        title: '首页',
        icon: 'HomeOutlined'
      },
      children: [
        {
          path: '/dashboard/index',
          name: 'dashboard-index',
          meta: {
            title: '首页',
            icon: 'HomeOutlined'
          }
        }
      ]
    },
    {
      path: '/system',
      redirect: 'noredirect',
      meta: {
        title: '系统管理',
        icon: 'HomeOutlined'
      },
      children: [
        {
          path: '/system/user',
          name: 'system-user',
          meta: {
            title: '用户管理',
            icon: 'HomeOutlined'
          }
        }
      ]
    }
  ]

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useStoreDispatch()
  const { selectedKeys, openKeys, collapsed, theme } = useStoreSelector(state => state.app)
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(false)

  // const [openKeys, setOpenKeys] = useState<string[]>([])

  // const getSubRoute = () => {
  //   const route = getMatchRoute(pathname, routes) || {}
  //   return (
  //     routes.find((item: any) => {
  //       return item.path == route?.path || item?.children?.find(c => c.path == route?.path)
  //     }) || {}
  //   )
  // }

  // console.log('getSubRoute', getSubRoute())

  useEffect(() => {
    if (!collapsed) {
      const keys = getOpenMenuKeys(pathname)
      dispatch(setOpenKeys(keys))
    }

    dispatch(setSelectedKeys([pathname]))

    const menus = getShowMenuList(routes) || []
    console.log('menus', menus)
    setMenuList(menus)
    setBreadcrumbList()
    setLoading(true)
  }, [pathname])

  const setBreadcrumbList = () => {
    const breadcrumbList = getAllBreadcrumbList(routes)
    const route = getMatchRoute(pathname, routes) || {}
    const matched = route?.path ?? ''
    const matchedList = breadcrumbList[matched]
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
