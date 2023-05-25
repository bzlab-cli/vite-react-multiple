import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import LayoutHeader from './components/header'
import ScaleBox from '@/components/scale-box'
import './index.scss'

const LayoutIndex = () => {
  const { Content } = Layout

  return (
    <ScaleBox>
      <Layout className="container">
        <LayoutHeader />
        <Content className="site-content">
          <Outlet />
        </Content>
      </Layout>
    </ScaleBox>
  )
}

export default LayoutIndex
