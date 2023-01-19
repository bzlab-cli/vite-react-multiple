/**
 * @Description: 页面路由容器组件
 * @Author: jrucker
 * @Date: 2022-01-10
 * @LastEditTime: 2022-02-22
 * @LastEditors: jrucker
 */
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ReactElementType, MetaType, OnRouteBeforeType, OnRouteBeforeResType } from './types'

function getDataType(data: any): string {
  return (Object.prototype.toString.call(data).match(/\s(\w+)\]/) as string[])[1]
}

let temp: ReactElementType | null = null

function Guard({
  element,
  meta,
  onRouteBefore
}: {
  element: ReactElementType
  meta: MetaType
  onRouteBefore?: OnRouteBeforeType
}) {
  meta = meta || {}

  const { pathname } = useLocation()

  const navigate = useNavigate()

  if (onRouteBefore) {
    if (temp === element) {
      return element
    }
    const pathRes = onRouteBefore({ pathname, meta })
    if (getDataType(pathRes) === 'Promise') {
      ;(pathRes as Promise<OnRouteBeforeResType>).then((res: OnRouteBeforeResType) => {
        if (res && res !== pathname) {
          navigate(res, { replace: true })
        }
      })
    } else {
      if (pathRes && pathRes !== pathname) {
        element = <Navigate to={pathRes as string} replace={true} />
      }
    }
  }

  temp = element
  return element
}

export default Guard
