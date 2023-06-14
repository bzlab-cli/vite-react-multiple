import { Layout, Row, Col, Space } from 'antd'
import Breadcrumb from './components/breadcrumb'
import Avatar from './components/avatar'
import Collapse from './components/collapse'
import Back from './components/back'
import { useStoreSelector } from '@/views/admin/store'
import './index.scss'

const { Header } = Layout

const LayoutHeader = () => {
  const { theme } = useStoreSelector(state => state.app)
  return (
    <Header
      style={{
        height: 48,
        lineHeight: '48px',
        padding: '0 12px',
        backgroundColor: theme === 'dark' ? '#fff' : undefined
      }}
    >
      <Row justify="space-between" align="middle">
        <Col>
          <Space>
            <Collapse />
            <Breadcrumb />
            <Back />
          </Space>
        </Col>
        <Col>
          <Space>
            <Avatar />
          </Space>
        </Col>
      </Row>
    </Header>
  )
}

export default LayoutHeader
