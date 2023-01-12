/**
 * @description: 路由中间件
 * @author: jrucker
 * @Date: 2023-01-11 11:00:09
 * @LastEditors: jrucker
 * @LastEditTime: 2023-01-11 11:00:09
 */
import * as React from 'react'
import { Outlet, RouteObject, useRoutes } from 'react-router-dom'

type DynamicElementType<T> = () => Promise<{ default: React.ComponentType<T> }>

export type MiddlewareWithType<P = unknown> = P & {
  children?: React.ReactNode | undefined
  item: RouteObjectWithMiddleware
}

export type MiddlewareType<T = MiddlewareWithType> = React.FC<T>

export type MergeRouteObject<M, N> = Omit<M, Extract<keyof M, keyof N>> & N

export type RouteObjectWithMiddleware = MergeRouteObject<
  RouteObject,
  {
    middleware?: MiddlewareType[]
    children?: RouteObjectWithMiddleware[]
    meta?: {
      title?: string
      icon?: any
      hidden?: boolean
    }
  }
>

const buildMiddleware = (
  element: React.ReactNode,
  middleware: MiddlewareType[],
  item: RouteObjectWithMiddleware
): React.ReactNode => {
  middleware = [...middleware].reverse()
  let component: React.ReactNode = element
  middleware.forEach(Middleware => {
    component = <Middleware item={item}>{component}</Middleware>
  })

  return component
}

type DynamicImportState = {
  loading: boolean
  Component: React.ComponentType<unknown> | null
}

type DynamicImportProps = {
  element: DynamicElementType<unknown>
  loading?: React.ReactNode
}

export class DynamicImport extends React.PureComponent<DynamicImportProps, DynamicImportState> {
  constructor(props: DynamicImportProps | Readonly<DynamicImportProps>) {
    super(props)
    this.state = {
      loading: false,
      Component: null
    }
  }

  componentDidMount() {
    const { element } = this.props
    this.handlerLoadComponent(element)
  }

  componentDidUpdate(prevProps: Readonly<DynamicImportProps>) {
    if (prevProps.element.toString() !== this.props.element.toString()) {
      this.handlerLoadComponent(this.props.element)
    }
  }

  handlerLoadComponent(element: DynamicElementType<unknown>) {
    this.setState({ loading: true })
    element()
      .then(module => module.default || module)
      .then(Component => {
        this.setState({ Component })
      })
      .catch(err => {
        throw err
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    const { Component, loading } = this.state
    if (loading) {
      return this.props.loading
    }
    return Component ? <Component /> : null
  }
}

const buildRoutes = (routes: RouteObjectWithMiddleware[]): RouteObject[] => {
  const items: RouteObject[] = []

  routes.forEach(route => {
    const { children, middleware, ...rest } = route
    const item: RouteObject = {
      ...rest
    }

    if (middleware?.length) {
      const element = item.element || <Outlet />
      item.element = buildMiddleware(element, middleware, route)
    }

    if (children?.length) {
      item.children = buildRoutes(children)
    }
    items.push(item)
  })

  return items
}

export const useRoutesWithMiddleware = (
  routes: RouteObjectWithMiddleware[],
  locationArg?: string | Partial<Location> | undefined
): React.ReactElement | null => {
  return useRoutes(buildRoutes(routes), locationArg)
}
