import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Tag, message, Typography } from 'antd'
import { useRef } from 'react'
import { searchConfig, tableOptions } from '@/constant/layout'
import { forEachTree, filterObjectEmpty } from '@/utils'
import { getMenuList } from '@/api/auth/menu'
import { dynamic } from '@bzlab/bz-react-core'
import AddMenu from './components/add-menu'
import { RightOutlined, DownOutlined } from '@ant-design/icons'

type TableListItem = {
  menuName: string
  menuType: number
  cache: number
  hiddenFlag: number
  status: number
}

const Menu = () => {
  const actionRef = useRef<ActionType>()

  const requestMenuList = async ({ current, ...params }: { current?: number }) => {
    const { retCode, data, retMsg } = await getMenuList(filterObjectEmpty({ pageNum: current, ...params }))
    if (retCode !== 200) message.warning(retMsg)
    const childrenName = 'childTreeList'
    forEachTree(data, item => {
      item.name = item.menuName
      item.children = item[childrenName] || []
    })
    return { data }
  }

  const handleAddMenu = async (title, record?) => {
    await dynamic.show({
      data: { title, record, isAdd: title === '新增菜单' },
      render: AddMenu
    })

    actionRef.current?.reload()
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
      align: 'center'
    },
    {
      title: '类型',
      dataIndex: 'menuType',
      align: 'center',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          {record.menuType === 1 && <Tag color="processing">目录</Tag>}
          {record.menuType === 2 && <Tag color="success">菜单</Tag>}
          {record.menuType === 3 && <Tag color="warning">按钮</Tag>}
        </>
      )
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode',
      align: 'center',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '组件地址',
      dataIndex: 'menuComponents',
      key: 'menuComponents',
      align: 'center',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '组件名称',
      dataIndex: 'menuRoute',
      key: 'menuRoute',
      align: 'center',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '排序',
      dataIndex: 'menuSort',
      key: 'menuSort',
      align: 'center',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '是否缓存',
      dataIndex: 'cache',
      key: 'cache',
      align: 'center',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          {record.menuType === 2 ? (
            <Tag color={record.cache == 0 ? 'error' : 'processing'}>{record.cache == 0 ? '禁用' : '启用'}</Tag>
          ) : (
            '-'
          )}
        </>
      )
    },
    {
      title: '是否显示',
      dataIndex: 'hiddenFlag',
      key: 'hiddenFlag',
      align: 'center',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => (
        <Tag color={record.hiddenFlag == 0 ? 'error' : 'processing'}>{record.hiddenFlag == 0 ? '隐藏' : '显示'}</Tag>
      )
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
      title: '操作',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 100,
      key: 'option',
      render: (_, record) => [
        <Typography.Link key="edit" onClick={() => handleAddMenu('修改菜单', record)}>
          修改
        </Typography.Link>
      ]
    }
  ]
  return (
    <>
      <ProTable<TableListItem>
        columns={columns}
        actionRef={actionRef}
        request={requestMenuList}
        rowKey="id"
        search={searchConfig}
        options={tableOptions}
        pagination={false}
        dateFormatter="string"
        headerTitle={
          <Button key="button" type="primary" onClick={() => handleAddMenu('新增菜单')}>
            新增菜单
          </Button>
        }
        expandIcon={({ expanded, onExpand, record }) => {
          if (record.menuType === 3) return null
          if (expanded) {
            return (
              <DownOutlined
                width={22}
                style={{ marginRight: '5px', color: '#999', fontSize: '12px' }}
                onClick={e => onExpand(record, e)}
              />
            )
          } else {
            return (
              <RightOutlined
                style={{ marginRight: '5px', color: '#999', fontSize: '12px' }}
                onClick={e => onExpand(record, e)}
              />
            )
          }
        }}
      />
    </>
  )
}

export default Menu
