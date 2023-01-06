import { UserOutlined } from '@ant-design/icons'
import { Dropdown, Row, Col, Avatar } from 'antd'
import type { MenuProps } from 'antd'
import { useStoreSelector, useStoreDispatch } from '@/store'
import { loginOut } from '@/store/modules/user'
import { PoweroffOutlined } from '@ant-design/icons'

const enum PersonalCenterMenuKeys {
  Logout = 'LOGOUT'
}

export default function PersonalCenterEntry() {
  const dispatch = useStoreDispatch()
  const items: MenuProps['items'] = [
    {
      key: PersonalCenterMenuKeys.Logout,
      danger: true,
      label: '退出登录',
      icon: <PoweroffOutlined />
    }
  ]
  const { name } = useStoreSelector(state => state.user)
  return (
    <Dropdown
      trigger={['hover']}
      menu={{
        items,
        style: { width: 110 },
        onClick: e => {
          switch (e.key) {
            case PersonalCenterMenuKeys.Logout:
              dispatch(loginOut())
              break
          }
        }
      }}
    >
      <Row
        gutter={10}
        style={{
          cursor: 'pointer',
          marginTop: -2,
          userSelect: 'none',
          padding: '0 10px'
        }}
      >
        <Col>
          <Avatar size="default" icon={<UserOutlined />} />
        </Col>
        <Col>{name}</Col>
      </Row>
    </Dropdown>
  )
}
