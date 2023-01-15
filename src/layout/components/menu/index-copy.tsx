import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
// import { useBreadcrumbFromMenu } from '../breadcrumb'
// import { useSetState } from 'ahooks'
// import { flatArrTree } from '@/utils'
// import type { SetState } from 'ahooks/es/useSetState'
import Logo from '../logo'
import { useStoreSelector, useStoreDispatch } from '@/store'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { setSelectedKeys, setOpenKeys, setBreadcrumb } from '@/store/modules/app'
// import { routes } from '@/router'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getOpenMenuKeys,
  getShowMenuList,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  splitPath,
  getMatchRoute,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPathRoute,
  getAllBreadcrumbList
} from '@/utils/permission'
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
  const { selectedKeys, openKeys, collapsed } = useStoreSelector(state => state.app)
  const [menuList, setMenuList] = useState<MenuItem[]>([])
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
    console.log('pathname', pathname)

    if (!collapsed) {
      // const openKey = getOpenMenuKeys(pathname)
      // console.log('openKey', openKey)
      // setOpenKeys(openKey)
      // dispatch(setOpenKeys(openKey))
    }

    dispatch(setSelectedKeys(pathname))

    const menus = getShowMenuList(routes)
    console.log('menus', menus)

    setMenuList(menus || [])

    const breadcrumbList = getAllBreadcrumbList(routes)
    const route = getMatchRoute(pathname, routes) || {}
    const matched = route?.path || ''
    const matchedList = breadcrumbList[matched]

    dispatch(setBreadcrumb(matchedList))
    console.log('breadcrumbList', breadcrumbList, matched, matchedList)
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
    <div className="menu">
      <Logo />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKeys]}
        onClick={onMenuClick}
        defaultOpenKeys={openKeys}
        onOpenChange={onOpenChange}
        items={menuList}
      />
    </div>
  )
}

export default LayoutMenu
