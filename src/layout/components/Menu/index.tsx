import { useNavigate, useLocation, matchPath, matchRoutes, Location, To } from 'react-router-dom'
import { Menu, message } from 'antd'
import { useEffect, useState, useRef } from 'react'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import { routes } from '@/router/routes'
import DynamicIcons, { DynamicIconKeys } from '@/components/icons'
import { useBreadcrumbFromMenu } from '../breadcrumb'
import { useSetState } from 'ahooks'
import { flatArrTree } from '@/utils'
import type { SetState } from 'ahooks/es/useSetState'
import { getMenuGrantByRoleId } from '@/api/auth/role'

interface MenuItem {
  key?: string
  label: string
  icon?: DynamicIconKeys
  route?: string
  children?: MenuItem[]
}

interface State {
  openKeys: string[]
  selectKey: string
}

export default function LayoutMenu() {
  const navigate = useNavigate()
  const menuData = useMenuData()

  // const [openKeys, setOpenKeys] = useState<string[]>([])

  const [state, setState] = useSetState<State>({
    openKeys: [],
    selectKey: ''
  })

  // 路由改变或者菜单数据变更更新菜单状态
  const menuItems = useMapLocationToMenuState({
    menuData,
    setState
  })

  const onOpenChange = (keys: string[]) => {
    const rootKeys = menuData.filter(item => item.children && item.children.length > 0).map(item => item.key)
    const latestOpenKey = keys.length > 0 ? keys[keys.length - 1] : undefined

    if (latestOpenKey && rootKeys.includes(latestOpenKey)) {
      setState({ openKeys: [latestOpenKey] })
    } else {
      setState({ openKeys: keys })
    }
  }

  useBreadcrumbFromMenu(
    {
      menu: menuData,
      menuStatePathKeys: [...getOpenKeys(state.selectKey), state.selectKey]
    },
    [state.selectKey]
  )

  return (
    <Menu
      id="custom-menu-popup"
      theme="dark"
      mode="inline"
      selectedKeys={[state.selectKey]}
      onClick={({ key }) => {
        setState({ selectKey: key })
        const pageUrl = menuItems.current.find(item => item.key === key)?.route as To
        navigate(pageUrl)
      }}
      openKeys={state.openKeys}
      onOpenChange={onOpenChange}
      items={generateMenuItems(menuData)}
    />
  )
}

/**
 * 菜单配置数据生成Menu组件用数据
 * @param {MenuItem[]} data
 * @returns
 */
const generateMenuItems = (data: MenuItem[]): ItemType[] => {
  const menu: ItemType[] = []
  data.forEach(item => {
    let children
    if (item.children) {
      children = generateMenuItems(item.children)
    }
    menu.push({
      key: item.key,
      label: item.label,
      icon: <DynamicIcons icon={item.icon} />,
      children
    } as ItemType)
  })
  return menu
}

// 通过 location 匹配出 菜单 selectKey
function getSelectKeys(expandMenuList: MenuItem[], location: Location) {
  let currentMenuItemConfig = expandMenuList.find(item => item.route === location.pathname)
  if (!currentMenuItemConfig) {
    // 此分支是为了处理菜单路由使用的是动态路由的情况
    const _routes = matchRoutes(routes, location)
    const routeModel = _routes
      ?.reduce((model, { route }) => `${model}${route.path === '/' ? '' : '/'}${route.path}`, '')
      .replace(/\/\//g, '/')
    currentMenuItemConfig = expandMenuList.find(menuItem => {
      return !!matchPath(routeModel || '', menuItem.route || '')
    })
  }
  return currentMenuItemConfig?.key || ''
}

// 通过 selectKey 解析出 openKeys
export function getOpenKeys(selectKey: string): string[] {
  if (!selectKey || selectKey.split('-').length === 2) {
    return []
  }
  const parseKey = selectKey.split('-')
  const parseKeyLen = parseKey.length - 1
  const first = parseKey[0] + '-' + parseKey[1]
  const openKeys: string[] = [first]
  for (let i = 2; i < parseKeyLen; i++) {
    const level = parseKey.slice(0, i + 1).join('-')
    openKeys.push(level)
  }
  return openKeys
}

// 路由改变或者菜单数据变更更新菜单状态
function useMapLocationToMenuState({ menuData, setState }: { menuData: MenuItem[]; setState: SetState<State> }) {
  const menuItems = useRef<MenuItem[]>([])
  const location = useLocation()

  useEffect(() => {
    // 展开菜单树结构数据
    if (menuItems.current.length === 0 && menuData.length > 0) {
      menuItems.current = flatArrTree(menuData, 'children')
    }
    // 设置菜单初始化状态
    if (menuData.length === 0 || menuItems.current.length === 0) {
      return
    }
    const selectKey = getSelectKeys(menuItems.current, location)
    const openKeys = getOpenKeys(selectKey)
    setState(prevState => ({
      openKeys: openKeys.length > 0 ? openKeys : prevState.openKeys,
      selectKey
    }))
  }, [menuData, location.pathname])

  return menuItems
}

/**
 * 自动添加菜单数据唯一key，如：menu-0 menu-1 menu-1-0 menu-1-1
 * @param data
 * @param prefix
 * @returns
 */
const addMenuKeys = (data: MenuItem[], prefix: string) => {
  const menu: MenuItem[] = []
  data.forEach((item, index) => {
    const key = prefix + '-' + index
    if (item.children) {
      item.children = addMenuKeys(item.children, key)
    }
    menu.push({ ...item, key })
  })
  return menu
}

const MenuData: any = [
  {
    label: 'Dashboard',
    icon: 'DashboardOutlined',
    route: '/'
  },
  {
    label: '表单页',
    icon: 'FormOutlined',
    children: [
      {
        label: '基础表单',
        route: '/form/basic-form'
      },
      {
        label: '分布表单',
        route: '/form/step-form'
      }
    ]
  }
]

/**
 * 获取菜单数据
 * @returns
 */
function useMenuData() {
  const [menuData, setMenuData] = useState<MenuItem[]>(addMenuKeys(MenuData, 'menu'))

  const IsUseServerMenu = false
  useEffect(() => {
    ;(async () => {
      if (IsUseServerMenu) {
        const { data, retCode, retMsg } = await getMenuGrantByRoleId({})
        if (retCode !== 200) return message.error(retMsg)

        setMenuData(addMenuKeys(data, 'menu'))
      }
    })()
  }, [])

  return menuData
}
