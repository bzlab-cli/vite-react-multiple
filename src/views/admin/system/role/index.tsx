import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Tag, message, Space, Divider, Typography } from 'antd'
import { useRef, useState } from 'react'
import { searchConfig, tableOptions, tablePagination } from '@/constant/layout'
import { filterObjectEmpty } from '@/utils'
import { getRoleList } from '@/api/auth/role'
import { dynamic } from '@bzlab/bz-react-core'
import AddRole from './components/add-role'
import AddAuth from './components/add-auth'

type TableListItem = {
  orgId: number
  orgName: string
  status: number
}

const Role = () => {
  const actionRef = useRef<ActionType>()

  const requestRoleList = async ({ current, ...params }: { current?: number }) => {
    const { retCode, data, retMsg } = await getRoleList(filterObjectEmpty({ pageNum: current, ...params }))
    if (retCode !== 200) message.warning(retMsg)
    return { ...data, data: data?.list }
  }

  const handleAddRole = async (title, record?) => {
    await dynamic.show({
      data: { title, record, isAdd: title === '新增角色' },
      render: AddRole
    })

    actionRef.current?.reload()
  }

  const handleAddAuth = async (title, record?) => {
    await dynamic.show({
      data: { title, record },
      render: AddAuth
    })

    actionRef.current?.reload()
  }

  const [columns] = useState<ProColumns<TableListItem>[]>([
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      align: 'center',
      ellipsis: true
    },
    {
      title: '状态',
      dataIndex: 'forbiddenStatus',
      align: 'center',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => (
        <Tag color={record.status == 0 ? 'processing' : 'error'}>{record.status == 0 ? '启用' : '禁用'}</Tag>
      )
    },
    {
      title: '组织',
      dataIndex: 'orgName',
      key: 'orgName',
      align: 'center',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => <span>{record.orgId === 0 ? '全部' : record.orgName}</span>
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 200,
      key: 'option',
      render: (_, record) => (
        <Space split={<Divider type="vertical" />} size={0}>
          <Typography.Link key="auth" onClick={() => handleAddAuth('授权', record)}>
            授权
          </Typography.Link>
          <Typography.Link key="edit" onClick={() => handleAddRole('修改角色', record)}>
            修改
          </Typography.Link>
        </Space>
      )
    }
  ])
  return (
    <>
      <ProTable<TableListItem>
        columns={columns}
        actionRef={actionRef}
        request={requestRoleList}
        rowKey="id"
        search={searchConfig}
        options={tableOptions}
        pagination={tablePagination}
        dateFormatter="string"
        headerTitle={
          <Button key="button" type="primary" onClick={() => handleAddRole('新增角色')}>
            新增角色
          </Button>
        }
      />
    </>
  )
}

export default Role
