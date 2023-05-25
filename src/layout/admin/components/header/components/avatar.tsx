import { Dropdown, Avatar, Modal } from 'antd'
import type { MenuProps } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useStoreSelector, useStoreDispatch } from '@/views/admin/store'
import { loginOut } from '@/views/admin/store/modules/user'

const enum MenuKeys {
  LogOut = 'LOGOUT'
}

export default function AvatarComponent() {
  const dispatch = useStoreDispatch()
  const { name, avatar } = useStoreSelector(state => state.user)

  const logOut = () => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定退出登录？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch(loginOut())
      }
    })
  }

  const menuItems: MenuProps['items'] = [
    {
      key: MenuKeys.LogOut,
      label: '退出登录',
      onClick: () => logOut()
    }
  ]

  return (
    <Dropdown
      trigger={['hover']}
      menu={{
        items: menuItems,
        style: { width: 110 }
      }}
    >
      <div className="avatar-dropdown">
        <Avatar size="default" src={avatar} />
        <span className="name">{name}</span>
      </div>
    </Dropdown>
  )
}
