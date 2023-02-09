import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Tag, message } from 'antd'
import { useRef } from 'react'
import { searchConfig, tableOptions } from '@/constant/layout'
import { filterObjectEmpty } from '@/utils'
import { getOrgList } from '@/api/auth/org'
import { dynamic } from '@bzlab/bz-react-core'
import AddOrg from './components/add-org'

type TableListItem = {
  orgName: string
  orgSort: number
  status: number
  orgId: number
}

const Org = () => {
  const actionRef = useRef<ActionType>()

  const requestOrgList = async ({ current, ...params }: { current?: number }) => {
    const { retCode, data, retMsg } = await getOrgList(filterObjectEmpty({ pageNum: current, ...params }))
    if (retCode !== 200) message.warning(retMsg)
    return { data }
  }

  const handleAddOrg = async (title, record?) => {
    await dynamic.show({
      data: { title, record, isAdd: title === '新增组织' },
      render: AddOrg
    })

    actionRef.current?.reload()
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '组织名称',
      dataIndex: 'orgName',
      key: 'orgName',
      align: 'center',
      ellipsis: true
    },
    {
      title: '排序',
      dataIndex: 'orgSort',
      key: 'orgSort',
      align: 'center',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => (
        <Tag color={record.status == 0 ? 'processing' : 'error'}>{record.status == 0 ? '启用' : '禁用'}</Tag>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
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
        <a key="edit" onClick={() => handleAddOrg('修改组织', record)}>
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
        request={requestOrgList}
        rowKey="id"
        search={searchConfig}
        options={tableOptions}
        pagination={false}
        dateFormatter="string"
        headerTitle={
          <Button key="button" type="primary" onClick={() => handleAddOrg('新增组织')}>
            新增组织
          </Button>
        }
      />
    </>
  )
}

export default Org
