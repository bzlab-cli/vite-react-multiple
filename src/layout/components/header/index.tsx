// import { Layout } from 'antd'
// import AvatarIcon from './components/avatar'
// import CollapseIcon from './components/collapse'
// import BreadcrumbNav from './components/breadcrumb'
// import './index.scss'

// const LayoutHeader = () => {
//   const { Header } = Layout

//   return (
//     <Header>
//       <div className="header-lf">
//         <CollapseIcon />
//         <BreadcrumbNav />
//       </div>
//       <div className="header-ri">
//         <span className="username">admin</span>
//         <AvatarIcon />
//       </div>
//     </Header>
//   )
// }

// export default LayoutHeader

import React from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Layout, Row, Col, Space } from 'antd'
import Breadcrumb from '../breadcrumb'
import PersonalCenter from './components/personal-center'
import { toggleCollapsed } from '@/store/modules/app'
import HeaderButton from './components/header-button'
import { useStoreSelector, useStoreDispatch } from '@/store'

const { Header } = Layout

const LayoutHeader = () => {
  const isDarkMode = false
  const dispatch = useStoreDispatch()
  const { collapsed } = useStoreSelector(state => state.app)
  return (
    <Header
      style={{
        height: 48,
        lineHeight: '48px',
        padding: '0 12px',
        backgroundColor: !isDarkMode ? '#fff' : undefined
      }}
    >
      <Row justify="space-between" align="middle">
        <Col>
          <Space>
            <HeaderButton
              icon={React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
              onClick={() => dispatch(toggleCollapsed(!collapsed))}
            />
            <Breadcrumb />
          </Space>
        </Col>
        <Col>
          <Space>
            <PersonalCenter />
          </Space>
        </Col>
      </Row>
    </Header>
  )
}

export default LayoutHeader
