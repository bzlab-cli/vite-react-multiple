import React from 'react'
import { Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { toggleCollapsed } from '@/views/admin/store/modules/app'
import { useStoreSelector, useStoreDispatch } from '@/views/admin/store'

const CollapseIcon = () => {
  const { collapsed } = useStoreSelector(state => state.app)
  const dispatch = useStoreDispatch()
  const btnProps = {
    icon: React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined),
    onClick: () => dispatch(toggleCollapsed(!collapsed))
  }
  return (
    <Button
      shape="circle"
      style={{ border: 'none', backgroundColor: 'transparent', fontSize: 14 }}
      block
      {...btnProps}
    />
  )
}

export default CollapseIcon
