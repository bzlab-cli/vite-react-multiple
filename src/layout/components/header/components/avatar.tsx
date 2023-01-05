import { Avatar, Modal, Dropdown, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
// import { setToken } from '@/redux/modules/global/action'
import avatar from '@/assets/images/logo/avatar.png'
import type { MenuProps } from 'antd'

const AvatarIcon = () => {
  const navigate = useNavigate()

  // 退出登录
  const logout = () => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '是否退出登录？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // setToken('')
        message.success('退出登录成功！')
        navigate('/login')
      }
    })
  }

  const MenuItems: MenuProps['items'] = [
    {
      key: '1',
      label: <span className="dropdown-item">首页</span>,
      onClick: () => navigate('/')
    },
    {
      type: 'divider'
    },
    {
      key: '4',
      label: <span className="dropdown-item">退出登录</span>,
      onClick: logout
    }
  ]
  return (
    <>
      <Dropdown menu={{ items: MenuItems }} placement="bottom" arrow trigger={['click']}>
        <Avatar size="large" src={avatar} />
      </Dropdown>
    </>
  )
}

export default AvatarIcon
