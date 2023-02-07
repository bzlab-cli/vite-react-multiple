import { useState } from 'react'
import { Modal, message, Form, Input, Radio } from 'antd'
import { addMenu, updateMenu } from '@/api/auth/menu'
import { getFormRules, filter, forEachTree } from '@/utils'

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
    menuType: { label: '菜单类型', rules: [{ required: true, message: '请输入组织名称' }] },
    menuName: { label: '菜单名称', rules: [{ required: true, message: '请输入菜单名称' }] },
    parentId: { label: '上级菜单' },
    menuSort: { label: '菜单排序', rules: [{ required: true, message: '请输入排序' }] },
    menuIcon: { label: '菜单图标' },
    menuRoute: { label: '组件名称', rules: [{ required: true, message: '请输入组件名称' }] },
    menuComponents: { label: '组件', rules: [{ required: true, message: '请输入组件' }] },
    menuUrl: { label: '组件路径', rules: [{ required: true, message: '请输入组件路径' }] },
    hiddenFlag: { label: '是否显示' },
    status: { label: '状态', rules: [{ required: true, message: '请选择状态' }] },
    menuCode: { label: '权限标识' },
    cache: { label: '缓存' }
  })

  record.orgId = record.orgId == 0 ? undefined : record.orgId

  const handleSubmit = async () => {
    const fields = form.getFieldsValue()
    const reqBody = {
      id: isAdd ? undefined : record.id,
      createDefaultButton: fields.menuType === 2,
      menuType: fields.menuType,
      menuName: fields.menuName,
      parentId: fields.parentId,
      menuCode: fields.menuCode,
      menuSort: fields.menuSort,
      menuIcon: fields.menuIcon,
      menuRoute: fields.menuRoute,
      menuUrl: fields.menuUrl,
      hiddenFlag: fields.hiddenFlag,
      status: fields.status,
      menuComponents: fields.menuComponents,
      remarks: fields.remarks,
      cache: fields.cache
    }

    await form.validateFields()
    const { retCode, retMsg } = isAdd ? await addMenu(reqBody) : await updateMenu(reqBody)
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
            <Form.Item {...formRules.menuName}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item {...formRules.menuSort}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item {...formRules.menuRoute}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item {...formRules.menuComponents}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item {...formRules.menuUrl}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item {...formRules.menuCode}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item {...formRules.cache}>
              <Radio.Group options={statusList} optionType="button" />
            </Form.Item>
          </>
        }
      </Form>
    </Modal>
  )
}

export default AntModal
