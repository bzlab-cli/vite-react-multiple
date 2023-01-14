// import { useRoutesWithMiddleware } from '@/middleware'
import { useRoutes } from 'react-router-dom'

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

export const RouterMiddleware = () => {
  return useRoutes(routes)
}
