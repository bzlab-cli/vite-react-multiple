import { Layout } from 'antd'
import AvatarIcon from './components/avatar'
import CollapseIcon from './components/collapse'
import BreadcrumbNav from './components/breadcrumb'
import './index.scss'

const LayoutHeader = () => {
  const { Header } = Layout

  return (
    <Header>
      <div className="header-lf">
        <CollapseIcon />
        <BreadcrumbNav />
      </div>
      <div className="header-ri">
        <span className="username">admin</span>
        <AvatarIcon />
      </div>
    </Header>
  )
}

export default LayoutHeader
