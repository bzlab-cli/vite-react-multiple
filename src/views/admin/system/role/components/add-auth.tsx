import { useState, useEffect } from 'react'
import { Modal, message, Form, Card, Tree } from 'antd'
import { getMenuGrantByRoleId, roleMenuGrant } from '@/api/auth/role'
import { forEachTree, getFormRules, flatArrTree } from '@/utils'
interface ModalProps {
  title: string
  record: { [key: string]: any }
  callback: (val?) => void
  destroy: (val?) => void
}

const AntModal = (props: ModalProps) => {
  const { title, record, callback } = props
  const [modalVisible, setModalVisible] = useState(true)
  const [form] = Form.useForm()
  const formLayout = { labelCol: { span: 4 } }
  const [menuList, setMenuList] = useState<{ [key: string]: string | number }[]>([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])

  const formRules = getFormRules({
    auth: { label: '权限' }
  })

  const fetchMenuList = async () => {
    const { data = [], retCode, retMsg } = await getMenuGrantByRoleId({ roleId: record.id })
    if (retCode !== 200) return message.warning(retMsg)
    const menuIds: number[] = []
    const grantFlagIds: number[] = []
    const childrenName = 'childTreeList'
    forEachTree(data, item => {
      item.name = item.menuName
      item.children = item[childrenName] || []
      menuIds.push(item.id)
      if (item.grantFlag) {
        grantFlagIds.push(item.id)
      }
    })

    setMenuList(data)
    setCheckedKeys(grantFlagIds)
    setExpandedKeys(menuIds)
  }

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue)
  }

  const onCheck = (checkedKeysValue: React.Key[]) => {
    setCheckedKeys(checkedKeysValue)
  }

  const onMounted = async () => {
    await fetchMenuList()
  }

  useEffect(() => {
    onMounted()
  }, [])

  const handleSubmit = async () => {
    const tree = flatArrTree(menuList, 'children')
    const menuIds = tree
      .filter(t => t.menuType === 3)
      .filter(item => checkedKeys.includes(item.id))
      .map(item => item.id)

    const reqBody = {
      menuIdList: menuIds,
      roleId: record.id
    }

    await form.validateFields()
    const { retCode, retMsg } = await roleMenuGrant(reqBody)
    if (retCode !== 200) return message.warning(retMsg)
    message.success('操作成功')
    setModalVisible(false)
    callback(true)
  }

  return (
    <Modal
      wrapClassName="add-auth-modal"
      title={title}
      open={modalVisible}
      onOk={handleSubmit}
      onCancel={() => setModalVisible(false)}
      maskClosable={false}
      destroyOnClose
    >
      <Form form={form} {...formLayout} initialValues={record}>
        <Form.Item {...formRules.auth}>
          <Card>
            <Tree
              checkable
              expandedKeys={expandedKeys}
              treeData={menuList}
              fieldNames={{ title: 'name', key: 'id' }}
              checkedKeys={checkedKeys}
              onExpand={onExpand}
              onCheck={onCheck}
            />
          </Card>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AntModal
