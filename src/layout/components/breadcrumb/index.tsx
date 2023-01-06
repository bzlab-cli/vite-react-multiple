import React, { useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { useStoreSelector, useStoreDispatch } from '@/store'
import { setBreadcrumb } from '@/store/modules/app'
import { DynamicIconKeys } from '@/components/icons'

interface MenuItem {
  key?: string
  label: string
  icon?: DynamicIconKeys
  route?: string
  children?: MenuItem[]
}

/**
 * 面包屑
 * @param {Array<String | {name: String; path: String}>} data
 * @returns
 */
const LayoutBreadcrumb = () => {
  const { breadcrumb } = useStoreSelector(state => state.app)
  return breadcrumb.length > 0 ? (
    <Breadcrumb separator=">">
      {breadcrumb.map((item: any, index) => {
        if (typeof item === 'object') {
          return (
            <Breadcrumb.Item key={index}>
              <Link to={item.path}>{item.name}</Link>
            </Breadcrumb.Item>
          )
        }
        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
      })}
    </Breadcrumb>
  ) : (
    <div style={{ height: 16 }} />
  )
}

interface UseBreadcrumbFromMenuProps {
  menu: MenuItem[]
  menuStatePathKeys: string[]
}

/**
 * 菜单数据面包屑
 */
export function useBreadcrumbFromMenu(
  { menu, menuStatePathKeys = [] }: UseBreadcrumbFromMenuProps,
  deps: React.DependencyList
) {
  const dispatch = useStoreDispatch()
  useEffect(() => {
    if (!menuStatePathKeys[0]) {
      return
    }
    const breadcrumbPath: string[] = []
    menuStatePathKeys.reduce((data, pathKey: string) => {
      const currentLevel = (data.find(menuitem => menuitem.key === pathKey) || {}) as MenuItem
      breadcrumbPath.push(currentLevel.label)
      return currentLevel?.children || []
    }, menu)
    dispatch(setBreadcrumb(breadcrumbPath))
  }, deps)
}

export default LayoutBreadcrumb
