import { flatRoutes } from '@/utils/permission'
import { sort } from '@/utils'
import Layout from '@/layout/admin'
import { lazy } from 'react'
import { LazyComponent } from '@/utils/lazy'
import { KeepAliveItem } from '@williamyi74/react-keepalive/es'
import { useLocation } from 'react-router-dom'
import { useStoreSelector } from '@/views/admin/store'
import { getMatchRoute } from '@/utils/permission'

const constantFiles = import.meta.globEager('./constant-modules/*.tsx')
let constantModules = []

Object.keys(constantFiles).forEach(key => {
  constantModules = constantModules.concat(constantFiles[key].default)
})

const asyncFiles = import.meta.globEager('./async-modules/*.tsx')
let asyncModules = []

Object.keys(asyncFiles).forEach(key => {
  asyncModules = asyncModules.concat(asyncFiles[key].default)
})

export const constantRoutes = [...constantModules]
export const asyncRoutes = [...asyncModules]
export const routes = [...constantModules, ...asyncModules]

export const addRouteMiddleware = routes => {
  const { cachedViews } = useStoreSelector(state => state.permission)
  console.log('cachedViews', cachedViews)
  const { pathname } = useLocation()
  const route = getMatchRoute(pathname, routes) || {}
  const name = route?.name ?? ''
  const redirect = 'noredirect'
  const allRoutes = [...constantModules, ...routes]
  const layoutRoutes = allRoutes.filter(item => item.redirect === redirect)
  const noLayoutRoutes = allRoutes.filter(item => item.redirect !== redirect)
  const flatAllRoutes = flatRoutes(layoutRoutes).filter(item => {
    item.length = item?.path?.length
    if (item.redirect !== redirect) {
      if (cachedViews.includes(name)) {
        item.element = (
          <KeepAliveItem cacheId={item?.name} key={item?.name} style={{ height: '100%' }}>
            <LazyComponent element={lazy(item.element)} />
          </KeepAliveItem>
        )
      } else {
        item.element = <LazyComponent element={lazy(item.element)} />
      }
    }
    return item.redirect !== redirect
  })

  flatAllRoutes.sort(sort('length'))
  const layout = {
    element: <Layout />,
    children: [...flatAllRoutes]
  }
  return [...noLayoutRoutes, layout]
}
