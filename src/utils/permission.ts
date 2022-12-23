/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/12/23 11:38:26
 */
import { deepClone } from '@bzlab/bz-core'

/**
 * 加载组件
 * @param {*} view
 * @returns
 */
const modules = import.meta.glob('/src/views/**/*.vue')

/**
 * 过滤显示菜单路由
 * @param {*} routers
 * @param {*} isRewrite
 * @returns
 */
export const filterAsyncRouter = (routers, layout) => {
  // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(item => {
    item.path = item.menuUrl
    if (item.menuComponents === 'Layout') {
      item.redirect = 'noredirect'
    }

    item.meta = {
      title: item.menuName,
      icon: item.menuIcon,
      breadcrumb: item.breadcrumb,
      hidden: item.hiddenFlag === 0
    }

    if (item.menuComponents) {
      if (item.menuComponents === 'Layout') {
        item.component = layout
      } else {
        item.name = item.menuRoute
        item.component = modules['/src/views/' + item.menuComponents]
      }
    }

    if (item.childTreeList && item.childTreeList.length) {
      item.children = filterAsyncRouter(item.childTreeList, layout)
    }

    filterProps(item)
    return true
  })
}

/**
 * 过滤不需要的属性
 * @param {*} item
 */
function filterProps(item) {
  const filterPropsList = [
    'childTreeList',
    'id',
    'menuSort',
    'createUser',
    'menuComponents',
    'menuIcon',
    'menuName',
    'menuRoute',
    'menuSource',
    'menuUrl',
    'parentId',
    'remarks',
    'createTime',
    'updateTime',
    'updateUser'
  ]
  filterPropsList.map(name => {
    delete item[name]
  })
}

/**
 * 扁平化路由数组对象
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
 * 递归过滤需要渲染在左侧菜单的列表
 * @param {Array} menuList
 * @return array
 * */
export function getShowMenuList(menuList) {
  const newMenuList = deepClone(menuList)
  return newMenuList.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return !item.meta?.hidden
  })
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
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const getRoute = (path: string, routes: Router.RouteRecordRaw[] = []): Router.RouteRecordRaw => {
  let result: Router.RouteRecordRaw = {}
  for (const item of routes) {
    if (item.path === path) return item
    if (item.children) {
      const res = getRoute(path, item.children)
      if (Object.keys(res).length) result = res
    }
  }
  return result
}
