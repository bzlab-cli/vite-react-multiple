import { useState } from 'react'
import { Modal, message, Form, Input, Radio } from 'antd'
import { addRole, updateRole } from '@/api/auth/role'
import { getFormRules } from '@/utils'

interface ModalProps {
  title: string
  record: { [key: string]: any }
  isAdd: boolean
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

const AntModal = (props: ModalProps) => {
  const defaultProps = { status: 0, parentId: 0, orgLevel: 1 }
  const { title, record = defaultProps, isAdd, callback } = props
  const [modalVisible, setModalVisible] = useState(true)
  const [form] = Form.useForm()
  const formLayout = { labelCol: { span: 4 } }
  const [statusList] = useState(statusRadio)
  const formRules = getFormRules({
    orgName: { label: '组织名称', rules: [{ required: true, message: '请输入组织名称' }] },
    orgSort: { label: '排序', rules: [{ required: true, message: '请输入排序' }] },
    status: { label: '状态', rules: [{ required: true, message: '请选择状态' }] },
    remarks: { label: '备注' }
  })

  record.orgId = record.orgId == 0 ? undefined : record.orgId

  const handleSubmit = async () => {
    const fields = form.getFieldsValue()
    const reqBody = {
      id: isAdd ? undefined : record.id,
      parentId: fields.parentId,
      orgLevel: fields.orgLevel,
      orgName: fields.orgName,
      status: fields.status,
      orgSort: fields.orgSort,
      remarks: fields.remarks
    }

    await form.validateFields()
    const { retCode, retMsg } = isAdd ? await addRole(reqBody) : await updateRole(reqBody)
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
            <Form.Item {...formRules.orgName}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item {...formRules.orgSort}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item {...formRules.status}>
              <Radio.Group options={statusList} optionType="button" />
            </Form.Item>
            <Form.Item {...formRules.remarks}>
              <Input placeholder="请输入" />
            </Form.Item>
          </>
        }
      </Form>
    </Modal>
  )
}

export default AntModal
