import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { toggleCollapsed } from '@/store/modules/app'
import { useStoreSelector } from '@/store'

const CollapseIcon = () => {
  const { collapsed } = useStoreSelector(state => state.app)
  return (
    <div
      className="collapsed"
      onClick={() => {
        toggleCollapsed(!collapsed)
      }}
    >
      {collapsed ? <MenuUnfoldOutlined id="isCollapse" /> : <MenuFoldOutlined id="isCollapse" />}
    </div>
  )
}

export default CollapseIcon
