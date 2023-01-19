/*
 * @Description: 主组件
 * @Author: jrucker
 * @Date: 2023-01-10
 * @LastEditTime: 2023/01/10 17:06:41
 * @LastEditors: jrucker
 */
import { useRoutes } from 'react-router-dom'
import Before from './before'
import { RouterWaiterPropsType } from './types'

function RouterWaiter({ routes, onRouteBefore, loading }: RouterWaiterPropsType) {
  const before = new Before({
    routes,
    onRouteBefore,
    loading
  })
  const reactRoutes = before.transformRoutes()
  const elements = useRoutes(reactRoutes)

  return elements
}

export default RouterWaiter
