/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/14 11:30:09
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useLayoutEffect, useEffect, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useLocation, useNavigate, matchRoutes, useSearchParams, useParams } from 'react-router-dom'
import { Modal } from 'antd'
import DynamicIcons from '@/components/icons'

/**
 * 加载组件
 * @param {*} view
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { lazy, createElement } from 'react'
// const modules = import.meta.glob('/src/views/**/*.vue')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { constantRoutes, asyncRoutes } from '@/router'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Layout = lazy(() => import('@/layout'))
// import lazyLoad from '@/utils/lazy-load'

// const lazyLoad = (path: string) => {
//   const Comp = React.lazy(() => import(`@/page/${path}`))
//   return (
//     <React.Suspense fallback={<>加载中</>}>
//       <Comp />
//     </React.Suspense>
//   )
// }

// const lazyLoad = (moduleName: string) => {
//   const Module = lazy(() => import(`views/${moduleName}`));
//   return <Module />;
// };

/**
 * 扁平化路由数组对象
 * @param {Array} menuList
 * @return array
 */
// export function flatRoutes(menuList) {
//   const newMenuList = deepClone(menuList)
//   return newMenuList.reduce((pre, current) => {
//     let flatArr = [...pre, current]
//     if (current.children) flatArr = [...flatArr, ...flatRoutes(current.children)]
//     return flatArr
//   }, [])
// }

// export function getShowMenuList(menus: Menu.MenuOptions[]) {
//   const menuList = updateMenuKeys(menus, 'menu')
//   const result = [] as any
//   menuList.forEach((item: Menu.MenuOptions) => {
//     if (!item?.children?.length) {
//       return !item.meta.hidden && result.push(getItem(item.meta.title, item.path, addIcon(item.meta.icon!)))
//     }
//     !item.meta.hidden &&
//       result.push(getItem(item.meta.title, item.path, addIcon(item.meta.icon!), getShowMenuList(item.children)))
//   })
//   return result
// }

/**
 * 递归过滤需要渲染在左侧菜单的列表
 * @param {Array} routes
 * @return array
 */
export function getShowMenuList(routes: Menu.MenuOptions[]) {
  const menuList = routes.map(item => {
    if (item.meta.hidden) return
    return {
      key: item?.path,
      icon: <DynamicIcons icon={item?.meta?.icon} />,
      children: item?.children?.length ? getShowMenuList(item.children) : null,
      label: item?.meta?.title
    }
  })
  return menuList.filter(item => item)
}

/**
 * 递归找出所有面包屑
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

// export const RouteListener = ({ onChange }: { onChange?: () => void } = {}) => {
//   const location = useLocation()
//   useLayoutEffect(() => {
//     if (onChange) onChange()
//   }, [location, onChange])
//   return <></>
// }

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onRouteChange = () => {
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
          title: '系统已更新，请刷新页面后访问！',
          okText: '刷新页面',
          onOk: () => location.reload(),
          cancelButtonProps: { style: { display: 'none' } }
        })
      } catch (e) {
        console.error(e)
      }
    })
}

// RouteListener(onRouteChange)

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
 * 面包屑类型
 */
export interface BreadcrumbType {
  title: string
  path: string
}

/**
 * @description 获取面包屑对应的数组
 * @param pathname 路由地址
 * @param routes 路由数据
 * @returns
 */
export const getBreadcrumbRoutes = (pathname: string, jsonRoutesData): BreadcrumbType[] => {
  const route = jsonRoutesData[pathname] || {}
  if (!route.path) {
    return []
  }

  if (!route.meta?.breadcrumb) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parentPath = route.meta?.parentPath || []
    // const routes = getPathsTheRoutes(parentPath, jsonRoutesData)
    const routes = [] as any
    const bread: BreadcrumbType[] = []

    for (let index = 0; index < routes.length; index++) {
      const element = routes[index]
      bread.push({
        title: element.meta?.title || '',
        path: element.path
      })
    }

    if (route.meta?.breadcrumb === false) {
      return bread
    }

    bread.push({
      title: route.meta?.title || '',
      path: route.path
    })

    return bread
  }

  return route.meta.breadcrumb
}

/**
 * @description 分割路径
 * @param path 路径
 */
export function splitPath(path: string): string[] {
  if (!path || typeof path !== 'string') return []
  const result = path?.split('/') || []
  if (result?.[0] === '') result.shift()
  return result
}

/**
 * @description 获取展开菜单数组
 * @param {String} path 当前访问地址
 * @returns array
 */
export function getOpenMenuKeys1(path: string): string[] {
  const arr = splitPath(path)
  const result: string[] = []
  if (arr.length === 1) return []
  if (arr.length === 2) result.push('/' + arr[0])
  if (arr.length > 2) {
    let str = '/' + arr[0]
    for (let i = 1; i < arr.length - 1; i++) {
      str += '/' + arr[i]
      result.push(str)
    }
  }
  return result
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
 * @description 更新菜单键值
 * @param routes
 * @param prefix
 * @returns
 */
export function updateMenuKeys(routes, prefix: string) {
  const menu = [] as any
  routes.forEach((item, index) => {
    const key = prefix + '-' + index
    if (item.children) {
      item.children = updateMenuKeys(item.children, key)
    }
    menu.push({ ...item, key })
  })
  return menu
}
