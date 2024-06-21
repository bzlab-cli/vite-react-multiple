import { useEffect, useState } from 'react'
import { FooterToolbar } from '@ant-design/pro-components'

function index({ children }) {
  const [distance, setDistance] = useState<any>()
  const myStyle = {
    left: distance,
    width: `calc(100% - ${distance}px)`
  }
  useEffect(() => {
    const sidebarElement = document.querySelector('.ant-layout-sider-dark')
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width } = entry.contentRect
        setDistance(width)
      }
    })

    // 监听元素宽度变化
    if (sidebarElement) {
      resizeObserver.observe(sidebarElement)
    }

    // 清除监听器
    return () => {
      if (sidebarElement) {
        resizeObserver.unobserve(sidebarElement)
      }
    }
  }, [])

  return (
    <>
      <div style={{ width: '100%', height: '70px' }} />
      <FooterToolbar style={myStyle}>{children}</FooterToolbar>
    </>
  )
}

export default index
