import { useState, useEffect } from 'react'
import { Modal, message, Form, Input, Radio } from 'antd'
import { addRole, updateRole } from '@/api/auth/role'
import { getOrgSelect2 } from '@/api/auth/org'
import { forEachTree, getFormRules } from '@/utils'
import BzTreeSelect from '@/components/bz-tree-select'

interface ModelProps {
  title: string
  record: { [key: string]: any }
  callback: (val?) => void
  destroy: (val?) => void
}

const statusRadio = [
  {
    label: '启用',
    value: 0
  },
  {
    label: '禁用',
    value: 1
  }
]

const AddRole = (props: ModelProps) => {
  const { title, record, callback } = props
  const [modalVisible, setModalVisible] = useState(true)
  const [form] = Form.useForm()
  const formLayout = { labelCol: { span: 4 } }
  const [statusList] = useState(statusRadio)
  const [treeSelectList, setTreeSelectList] = useState([])
  const formRules = getFormRules({
    roleName: { label: '角色名称', rules: [{ required: true, message: '请输入角色名称' }] },
    orgId: { label: '组织' },
    status: { label: '状态', rules: [{ required: true, message: '请选择状态' }] }
  })

  const fetchOrgList = async () => {
    const reqBody = { orgLevel: 1, parentId: 0 }
    const { data, retCode, retMsg } = await getOrgSelect2(reqBody)
    if (retCode !== 200) return message.warning(retMsg)
    forEachTree(data || [], item => {
      item.title = item.orgName
      item.value = item.id
    })

    setTreeSelectList(data)
  }

  const onMounted = async () => {
    await fetchOrgList()
  }

  useEffect(() => {
    onMounted()
  }, [])

  const handleSubmit = async () => {
    const fields = form.getFieldsValue()
    const reqBody = {
      id: !record ? undefined : record.id,
      orgId: fields.orgId,
      status: fields.status,
      remarks: fields.remarks,
      roleName: fields.roleName
    }

    await form.validateFields()
    const { retCode, retMsg } = !record ? await addRole(reqBody) : await updateRole(reqBody)
    if (retCode !== 200) return message.warning(retMsg)
    message.success('操作成功')
    setModalVisible(false)
    callback(true)
  }

  return (
    <Modal title={title} open={modalVisible} onOk={handleSubmit} onCancel={() => setModalVisible(false)} destroyOnClose>
      <Form form={form} {...formLayout} initialValues={record}>
        {
          <>
            <Form.Item {...formRules.roleName}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item {...formRules.orgId}>
              <BzTreeSelect selectValue={record?.orgId} treeData={treeSelectList} />
            </Form.Item>
            <Form.Item {...formRules.status}>
              <Radio.Group options={statusList} optionType="button" />
            </Form.Item>
          </>
        }
      </Form>
    </Modal>
  )
}

export default AddRole
