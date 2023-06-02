import { useEffect } from 'react'
import { useOutlet } from 'react-router-dom'
import { Layout } from 'antd'
import LayoutMenu from './components/menu'
import LayoutHeader from './components/header'
import { useStoreSelector } from '@/views/admin/store'
import resize from './resize'
import './index.scss'

const LayoutIndex = () => {
  const outlet = useOutlet()
  const { collapsed, theme } = useStoreSelector(state => state.app)
  const { addEventListenerOnResize, resizeMounted, removeEventListenerResize } = resize()
  const { Sider, Content } = Layout

  useEffect(() => {
    resizeMounted()
    addEventListenerOnResize()
    return () => {
      removeEventListenerResize()
    }
  }, [])

  return (
    <Layout className="container">
      <Sider width={220} collapsedWidth={80} trigger={null} collapsed={collapsed} theme={theme}>
        <LayoutMenu />
      </Sider>
      <Layout className="site-layout">
        <LayoutHeader />
        <Content className="site-content">{outlet}</Content>
      </Layout>
    </Layout>
  )
}

export default LayoutIndex
