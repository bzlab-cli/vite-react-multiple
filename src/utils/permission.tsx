/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/19 23:52:56
 */
import { matchRoutes, useSearchParams, useParams } from 'react-router-dom'
import { Modal } from 'antd'
import DynamicIcons from '@/components/icons'
import { deepClone } from '@/utils'

/**
 * @description 扁平化数组对象
 * @param {Array} menuList
 * @return array
 */
export function flatRoutes(menuList) {
  const newMenuList = deepClone(menuList)
  return newMenuList.reduce((pre, current) => {
    let flatArr = [...pre, current]
    if (current.children) flatArr = [...flatArr, ...flatRoutes(current.children)]
    return flatArr
  }, [])
}

/**
 * @description 过滤渲染在左侧菜单的列表
 * @param {Array} routes
 * @return array
 */
export function getShowMenuList(routes: Menu.MenuOptions[]) {
  const filterMenuList = (routes: Menu.MenuOptions[]) => {
    const menuList = routes.map(item => {
      if (item.meta.hidden) return
      return {
        key: item?.path,
        icon: <DynamicIcons icon={item?.meta?.icon} />,
        children: item?.children?.length ? filterMenuList(item.children) : null,
        label: item?.meta?.title
      }
    })
    return menuList.filter(item => item)
  }
  const list = filterMenuList(routes)
  const treeDone = data => {
    data.forEach(item => {
      if (item.children && item.children.length) {
        item = treeDone(item.children)
      } else {
        delete item.children
      }
      return item
    })
    return data
  }
  const tree = treeDone(list)
  return tree
}

/**
 * @description 递归找出所有面包屑
 * @param {Array} menuList
 * @param {Object} result
 * @param {String} path
 * @returns object
 */
export const getAllBreadcrumbList = (menuList, result: { [key: string]: any } = {}, path = []) => {
  for (const item of menuList) {
    result[item.path] = [...path, item]
    if (item.children) getAllBreadcrumbList(item.children, result, result[item.path])
  }
  return result
}

interface BreadcrumbItem {
  path?: string
  title: string
}

/**
 * @description 根据路由地址查找面包屑
 * @param menuList 菜单数据
 * @param path 路由地址
 * @param breadcrumbs 面包屑
 * @returns
 */
export const getPathBreadcrumbList = (
  menuList: Menu.MenuOptions[],
  path: string,
  breadcrumbs: BreadcrumbItem[] = []
) => {
  let breadcrumbList: BreadcrumbItem[] = []
  let end = false
  const forEach = (menuList, path, breadcrumbs) => {
    for (const menu of menuList) {
      const list: BreadcrumbItem[] = []
      if (!end) {
        list.push({
          path: menu.path,
          title: menu.meta.title
        })
        if (menu.path == path) {
          breadcrumbList = breadcrumbs.concat(list)
          end = true
          break
        } else if (menu.children) {
          forEach(menu.children, path, breadcrumbs.concat(list))
        }
      }
    }
  }
  forEach(menuList, path, breadcrumbs)
  return breadcrumbList
}

/**
 * @description 匹配路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const getMatchRoute = (path: string, routes: Router.RouteRecordRaw[] = []) => {
  const match = matchRoutes(routes, path)
  if (!match) return null
  return match.at(-1)?.route
}

/**
 * @description 递归查询对应路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const getPathRoute = (path: string, routes: Router.RouteRecordRaw[] = []): Router.RouteRecordRaw => {
  let result: Router.RouteRecordRaw = {}
  for (const item of routes) {
    if (item.path === path) return item
    if (item.children) {
      const res = getPathRoute(path, item.children)
      if (Object.keys(res).length) result = res
    }
  }
  return result
}

/**
 * @description 获取子路由父级
 * @param path 当前访问地址
 * @param routes 路由列表
 * @returns
 */
export const getSubRoute = (path, routes) => {
  const route = getMatchRoute(path, routes) || {}
  return (
    routes.find((item: any) => {
      return item.path == route?.path || item?.children?.find(c => c.path == route?.path)
    }) || {}
  )
}

/**
 * @description 查询路由参数
 * @param {string} key 键值
 * @returns any
 */
export const getSearchParams = key => {
  const [searchParams] = useSearchParams()
  return searchParams.get(key)
}

/**
 * @description 查询动态路由参数
 * @param {string} key 键值
 * @returns any
 */
export const getParams = key => {
  const params = useParams()
  return params[key]
}

/**
 * @description 监听系统更新
 */
export const routeListener = () => {
  fetch(`/version.json?t=${Date.now()}`)
    .then(res => res.json())
    .then(res => {
      try {
        const data = res || {},
          lastVersion = window.localStorage.getItem('buildVersion')
        if (lastVersion == null) return window.localStorage.setItem('buildVersion', data.version)
        if (data.version === lastVersion) return
        window.localStorage.setItem('buildVersion', data.version)
        Modal.confirm({
          title: '提示',
          icon: <DynamicIcons icon="ExclamationCircleOutlined" />,
          content: '系统已更新，请刷新页面后访问！',
          okText: '确认',
          onOk: () => location.reload(),
          cancelButtonProps: { style: { display: 'none' } }
        })
      } catch (e) {
        console.error(e)
      }
    })
}

/**
 * @description 筛选有权限的菜单
 * @param routes 路由数据
 * @returns
 */
export const filterAuthMenuItem = routes => {
  const getMenuChild = menuList =>
    menuList.reduce((total, cur) => total.concat(Array.isArray(cur.children) ? getMenuChild(cur.children) : cur), [])
  return getMenuChild(routes).find(item => item.auth)
}

/**
 * @description 面包屑类型
 */
export interface BreadcrumbType {
  title: string
  path: string
}

/**
 * @description 获取展开菜单数组
 * @param {String} path 当前访问地址
 * @returns array
 */
export function getOpenMenuKeys(path: string) {
  let str: string = ''
  const result: string[] = []
  const arr = path.split('/').map(i => '/' + i)
  for (let i = 1; i < arr.length - 1; i++) {
    str += arr[i]
    result.push(str)
  }
  return result
}

/**
 * @description 设置展开单个菜单
 * @param menus 菜单数据
 * @param keys 展开key
 * @returns string[]
 */
export function getSingleOpenChangeKeys(menus, keys) {
  const rootKeys = menus.filter(item => item.children && item.children.length > 0).map(item => item.path)
  const latestOpenKey = keys.length > 0 ? keys[keys.length - 1] : undefined
  if (latestOpenKey && rootKeys.includes(latestOpenKey)) {
    return [latestOpenKey]
  } else {
    return keys
  }
}

/**
 * @description 过滤权限路由
 * @param auth
 * @param routes
 * @returns
 */
export const filterAuthRoutes = (auth: string[], routes) => {
  return routes.reduce((total: any, cur) => {
    if (cur.children) {
      const children = cur.children?.filter(i => auth.includes(i.name))
      if (children.length) {
        total.push({ ...cur, children })
      }
      return total
    }
    if (!auth.includes(cur.name)) return total
    total.push(cur)
    return total
  }, [])
}
