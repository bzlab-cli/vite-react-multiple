import { flatRoutes } from '@/utils/permission'
import { sort } from '@/utils'
import Layout from '@/layout/screen'
import { lazy } from 'react'
import { LazyComponent } from '@/utils/lazy'

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

export const addRouteMiddleware = (routes?) => {
  const redirect = 'noredirect'
  const allRoutes = [...constantModules, ...routes]
  const layoutRoutes = allRoutes.filter(item => item.redirect === redirect)
  const noLayoutRoutes = allRoutes.filter(item => item.redirect !== redirect)
  const flatAllRoutes = flatRoutes(layoutRoutes).filter(item => {
    item.length = item?.path?.length
    if (item.redirect !== redirect) {
      item.element = <LazyComponent element={lazy(item.element)} />
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
