import {
  HomeOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
  BlockOutlined,
  LinkOutlined,
  LockOutlined,
  DashboardOutlined,
  FormOutlined,
  TableOutlined
} from '@ant-design/icons'

import * as Icons from '@ant-design/icons'
// const icons: { [key: string]: any } = Icons

export type DynamicIconKeys = keyof typeof Icons

const icons = {
  HomeOutlined: <HomeOutlined />,
  SettingOutlined: <SettingOutlined />,
  UnorderedListOutlined: <UnorderedListOutlined />,
  UserOutlined: <UserOutlined />,
  BlockOutlined: <BlockOutlined />,
  LinkOutlined: <LinkOutlined />,
  LockOutlined: <LockOutlined />,
  DashboardOutlined: <DashboardOutlined />,
  FormOutlined: <FormOutlined />,
  TableOutlined: <TableOutlined />
}

export default function DynamicIcons({ icon }: { icon?: DynamicIconKeys }) {
  if (!icon || !icons[icon]) {
    return null
  }
  return icons[icon]
}
