import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import LayoutMenu from './components/menu/index-copy'
import LayoutHeader from './components/header'
import Logo from './components/logo'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useStoreSelector, useStoreDispatch } from '@/store'
// import { toggleCollapsed } from '@/store/modules/app'
import './index.scss'

const LayoutIndex = () => {
  const { collapsed } = useStoreSelector(state => state.app)
  // const dispatch = useStoreDispatch()
  const { Sider, Content } = Layout
  // const opened = sidebar.opened

  // const addEventListenerOnResize = () => {
  //   window.onresize = () => {
  //     console.log('22')

  //     return (() => {
  //       const screenWidth = document.body.clientWidth
  //       if (screenWidth < 1200) dispatch(toggleCollapsed(true))
  //       if (screenWidth > 1200) dispatch(toggleCollapsed(false))
  //     })()
  //   }
  // }

  useEffect(() => {
    // addEventListenerOnResize()
  }, [])

  return (
    <Layout className="container">
      <Sider width={260} collapsedWidth={80} trigger={null} collapsed={collapsed} theme="dark">
        <div
          style={{
            overflowY: 'auto',
            height: '100vh',
            position: 'sticky',
            top: 0
          }}
        >
          <Logo />
          <LayoutMenu />
        </div>
      </Sider>
      <Layout className="site-layout">
        <LayoutHeader />
        <Content className="site-content">
          <Outlet />

          {/* <Suspense fallback={<Loading height="100%" />}>
            <Outlet />
          </Suspense> */}
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutIndex
