import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Tag, message } from 'antd'
import { useRef, useEffect, useState } from 'react'
import { statusList } from '@/constant/user'
import { searchConfig, tableOptions, tablePagination } from '@/constant/layout'
import { filterObjectEmpty } from '@/utils'
import { getUserList, resetPassword, deleteUser, updateUserForbiddenStatus } from '@/api/auth/user'
import { getRoleSelect2 } from '@/api/auth/role'
import { getOrgList } from '@/api/auth/org'
import { useConfirm } from '@/hooks/handle/use-confirm'
import dynamic from '@/components/dynamic'
import AddUser from './components/add-user'

type TableListItem = {
  forbiddenStatus: number
}

const User = () => {
  const actionRef = useRef<ActionType>()
  const [roleList, setRoleList] = useState<{ [key: string]: { text: string } }>()
  const [orgList, setOrgList] = useState<{ [key: string]: { text: string } }>()

  const requestRoleSelect2 = async () => {
    const { data } = await getRoleSelect2(undefined)
    const obj = {}
    data.map(({ roleName, id }) => {
      obj[id] = { text: roleName }
    })
    setRoleList(obj)
  }

  const requestOrgList = async () => {
    const { data } = await getOrgList(undefined)
    const obj = {}
    data.map(({ orgName, id }) => {
      obj[id] = { text: orgName }
    })
    setOrgList(obj)
  }

  const requestUserList = async ({ current, ...params }: { current?: number }) => {
    const { retCode, data, retMsg } = await getUserList(filterObjectEmpty({ pageNum: current, ...params }))
    if (retCode !== 200) message.warning(retMsg)
    return { ...data, data: data?.list }
  }

  const handleEnableChange = async (row, flag) => {
    const message = `确认${flag === 0 ? '禁用' : '启用'}?`
    await useConfirm(updateUserForbiddenStatus, { userId: row.userId, forbiddenStatus: flag }, message)
    actionRef.current?.reload()
  }

  const handleResetPwd = async row => {
    const { retCode, retMsg } = await resetPassword({ userId: row.userId })
    if (retCode !== 200) return message.warning(retMsg)
    message.success('重置成功')
  }

  const handleDelete = async row => {
    const message = `确认删除?`
    await useConfirm(deleteUser, { userId: row.userId }, message)
    actionRef.current?.reload()
  }

  const handleAddUser = async (title, record?) => {
    await dynamic.show({
      data: { title, record, isAdd: title === '新增用户' },
      render: AddUser
    })

    actionRef.current?.reload()
  }

  useEffect(() => {
    requestRoleSelect2()
    requestOrgList()
  }, [])

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center',
      ellipsis: true
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      ellipsis: true
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      align: 'center',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '角色',
      dataIndex: 'roleId',
      key: 'eqRoleId',
      align: 'center',
      ellipsis: true,
      valueEnum: roleList
    },
    {
      title: '组织',
      dataIndex: 'orgId',
      key: 'eqOrgId',
      align: 'center',
      ellipsis: true,
      valueEnum: orgList
    },
    {
      title: '状态',
      dataIndex: 'forbiddenStatus',
      align: 'center',
      ellipsis: true,
      valueEnum: statusList,
      render: (_, record) => (
        <Tag color={record.forbiddenStatus == 1 ? 'processing' : 'error'}>
          {record.forbiddenStatus == 1 ? '启用' : '禁用'}
        </Tag>
      )
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      align: 'center',
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
        <a key="edit" onClick={() => handleAddUser('修改用户', record)}>
          修改
        </a>,
        <a
          key="status"
          onClick={() => {
            handleEnableChange(record, record.forbiddenStatus == 1 ? 0 : 1)
          }}
        >
          {record.forbiddenStatus == 1 ? '禁用' : '启用'}
        </a>,
        <a key="reset" onClick={() => handleResetPwd(record)}>
          重置密码
        </a>,
        <a key="delete" onClick={() => handleDelete(record)}>
          删除
        </a>
      ]
    }
  ]
  return (
    <>
      <ProTable<TableListItem>
        columns={columns}
        actionRef={actionRef}
        request={requestUserList}
        rowKey="userId"
        search={searchConfig}
        options={tableOptions}
        pagination={tablePagination}
        dateFormatter="string"
        headerTitle={
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => handleAddUser('新增用户')}>
            新增用户
          </Button>
        }
      />
    </>
  )
}

export default User
