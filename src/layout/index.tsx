import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Layout } from 'antd'
import LayoutMenu from './components/menu/index-copy'
import LayoutHeader from './components/header'
import { useStoreSelector, useStoreDispatch } from '@/store'
import { setOpenKeys } from '@/store/modules/app'
import { getOpenMenuKeys } from '@/utils/permission'
import resize from './resize'
import './index.scss'

const LayoutIndex = () => {
  const { pathname } = useLocation()
  const dispatch = useStoreDispatch()
  const { collapsed, theme } = useStoreSelector(state => state.app)
  const { addEventListenerOnResize, resizeMounted, removeEventListenerResize } = resize()
  const { Sider, Content } = Layout

  useEffect(() => {
    const openKeys = getOpenMenuKeys(pathname)
    dispatch(setOpenKeys(openKeys))

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
        <Content className="site-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutIndex
