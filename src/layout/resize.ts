/*
 * @Description: 根据大小变化重新布局
 * @Author: jrucker
 * @Date: 2023-01-12 15:37:56
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/14 16:55:32
 */

import { useStoreDispatch } from '@/store'
import { toggleCollapsed } from '@/store/modules/app'
const WIDTH = 992

export default function () {
  const dispatch = useStoreDispatch()

  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const resizeMounted = () => {
    if (isMobile()) {
      dispatch(toggleCollapsed(true))
    }
  }

  const resizeHandler = () => {
    if (!document.hidden) {
      dispatch(toggleCollapsed(isMobile()))
    }
  }
  const addEventListenerOnResize = () => {
    window.addEventListener('resize', resizeHandler)
  }

  const removeEventListenerResize = () => {
    window.removeEventListener('resize', resizeHandler)
  }

  return {
    resizeMounted,
    addEventListenerOnResize,
    removeEventListenerResize
  }
}
