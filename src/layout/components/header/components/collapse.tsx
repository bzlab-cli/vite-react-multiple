import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { toggleSidebar } from '@/store/modules/app'
import { getStoreState } from '@/store'

const CollapseIcon = () => {
  const store = getStoreState()
  const opened = store.app.sidebar.opened
  return (
    <div
      className="collapsed"
      onClick={() => {
        toggleSidebar(!opened)
      }}
    >
      {opened ? <MenuUnfoldOutlined id="isCollapse" /> : <MenuFoldOutlined id="isCollapse" />}
    </div>
  )
}

export default CollapseIcon
