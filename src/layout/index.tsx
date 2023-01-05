import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
// import { setAuthButtons } from '@/redux/modules/auth/action'
// import { updateCollapse } from '@/redux/modules/menu/action'
// import { connect } from 'react-redux'
import LayoutMenu from './components/menu'
import LayoutHeader from './components/header'
import LayoutFooter from './components/footer'
import { getStoreState } from '@/store'
import { toggleSidebar } from '@/store/modules/app'
import './index.scss'

const LayoutIndex = () => {
  const store = getStoreState()
  const { Sider, Content } = Layout
  const opened = store.app.sidebar.opened

  const addEventListenerOnResize = () => {
    window.onresize = () => {
      return (() => {
        const screenWidth = document.body.clientWidth
        if (!opened && screenWidth < 1200) toggleSidebar(true)
        if (!opened && screenWidth > 1200) toggleSidebar(false)
      })()
    }
  }

  useEffect(() => {
    addEventListenerOnResize()
  }, [])

  return (
    <Layout className="container">
      <Sider trigger={null} collapsed={opened} width={220} theme="dark">
        <LayoutMenu></LayoutMenu>
      </Sider>
      <Layout className="site-layout">
        <LayoutHeader></LayoutHeader>
        <Content className="site-content">
          <Outlet></Outlet>

          {/* <Suspense fallback={<Loading height="100%" />}>
            <Outlet />
          </Suspense> */}
        </Content>
        <LayoutFooter></LayoutFooter>
      </Layout>
    </Layout>
  )
}

export default LayoutIndex
