import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Tag, message } from 'antd'
import { useRef } from 'react'
import { searchConfig, tableOptions, tablePagination } from '@/constant/layout'
import { filterObjectEmpty } from '@/utils'
import { getRoleList } from '@/api/auth/role'
import dynamic from '@/components/dynamic'
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

  const handleAddRole = async (title, record: any = {}) => {
    record.orgId = record.orgId == 0 ? undefined : record.orgId
    if (!record.status) record.status = 0
    await dynamic.show({
      data: { title, record },
      render: AddRole
    })

    actionRef.current?.reload()
  }

  const handleAddAuth = async (title, record?) => {
    await dynamic.show({
      data: { title, record: record || null },
      render: AddAuth
    })

    actionRef.current?.reload()
  }

  const columns: ProColumns<TableListItem>[] = [
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
      render: (_, record) => [
        <a key="auth" onClick={() => handleAddAuth('授权', record)}>
          授权
        </a>,
        <a key="edit" onClick={() => handleAddRole('修改角色', record)}>
          修改
        </a>
      ]
    }
  ]
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
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => handleAddRole('新增角色')}>
            新增角色
          </Button>
        }
      />
    </>
  )
}

export default Role
