/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/13 10:25:12
 */
// import { deepClone } from '@bzlab/bz-core'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useLayoutEffect, useEffect, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useLocation, useNavigate, matchRoutes, useSearchParams, useParams } from 'react-router-dom'
import { Modal } from 'antd'

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
import lazyLoad from '@/utils/lazy-load'

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

export const filterAsyncRouter = routers => {
  console.log('routers', routers)

  return routers.filter(item => {
    item.path = item.menuUrl
    const menuComponents = item.menuComponents
    if (menuComponents === 'Layout') {
      // item.element = <Navigate to={item.redirect} replace={true} />
      item.redirect = 'noredirect'
    }

    item.meta = {
      title: item.menuName,
      icon: item.menuIcon,
      hidden: item.hiddenFlag === 0
    }

    if (menuComponents) {
      if (menuComponents === 'Layout') {
        // item.element = Layout
        item.element = createElement(Layout)
      } else {
        // item.name = item.menuRoute
        // item.element = modules['/src/views/' + item.menuComponents]
        item.element = lazyLoad(menuComponents)
      }
    }

    if (item.childTreeList && item.childTreeList.length) {
      item.children = filterAsyncRouter(item.childTreeList)
    }

    filterProps(item)
    return true
  })
}

/**
 * 过滤显示菜单路由
 * @param {*} routers
 * @param {*} isRewrite
 * @returns
 */
// export const filterAsyncRouter = routers => {
//   console.log('routers', routers)

//   return routers.filter(item => {
//     item.path = item.menuUrl
//     const menuComponents = item.menuComponents
//     if (menuComponents === 'Layout') {
//       // item.element = <Navigate to={item.redirect} replace={true} />
//       item.redirect = 'noredirect'
//     }

//     item.meta = {
//       title: item.menuName,
//       icon: item.menuIcon,
//       hidden: item.hiddenFlag === 0
//     }

//     if (menuComponents) {
//       if (menuComponents === 'Layout') {
//         // item.element = Layout
//         item.element = createElement(Layout)
//       } else {
//         // item.name = item.menuRoute
//         // item.element = modules['/src/views/' + item.menuComponents]
//         item.element = lazyLoad(menuComponents)
//       }
//     }

//     if (item.childTreeList && item.childTreeList.length) {
//       item.children = filterAsyncRouter(item.childTreeList)
//     }

//     filterProps(item)
//     return true
//   })
// }

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
// export function flatRoutes(menuList) {
//   const newMenuList = deepClone(menuList)
//   return newMenuList.reduce((pre, current) => {
//     let flatArr = [...pre, current]
//     if (current.children) flatArr = [...flatArr, ...flatRoutes(current.children)]
//     return flatArr
//   }, [])
// }

/**
 * 递归过滤需要渲染在左侧菜单的列表
 * @param {Array} menuList
 * @return array
 * */
// export function getShowMenuList(menuList) {
//   const newMenuList = deepClone(menuList)
//   return newMenuList.filter(item => {
//     item.children?.length && (item.children = getShowMenuList(item.children))
//     return !item.meta?.hidden
//   })
// }

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
  const matchResult = matchRoutes(routes, path)
  if (!matchResult) return null
  return matchResult.at(-1)?.route
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

export const RouteListener = ({ onChange }: { onChange?: () => void } = {}) => {
  const location = useLocation()
  useLayoutEffect(() => {
    if (onChange) onChange()
  }, [location, onChange])
  return <></>
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
