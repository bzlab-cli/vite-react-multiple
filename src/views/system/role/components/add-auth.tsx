import { useState, useEffect } from 'react'
import { Modal, message, Form, Input, Select } from 'antd'
import { addUser, updateUser, getCompetence } from '@/api/auth/user'
import { getRoleSelect2 } from '@/api/auth/role'
import { getOrgSelect2 } from '@/api/auth/org'
import { forEachTree, getFormRules } from '@/utils'
import { IProfessSchema, professList } from '@/constant/professional'
import BzTreeSelect from '@/components/bz-tree-select'

interface ModelProps {
  title: string
  record: { [key: string]: any }
  callback: (val?) => void
  destroy: (val?) => void
}

const AddUser = (props: ModelProps) => {
  const { title, record, callback } = props
  const [modalVisible, setModalVisible] = useState(true)
  const [form] = Form.useForm()
  const formLayout = { labelCol: { span: 4 } }
  const [roleList, setRoleList] = useState<any[]>([])
  const [treeSelectList, setTreeSelectList] = useState([])
  const [competenceList, setCompetenceList] = useState<any[]>([])
  const [professSelectList] = useState<IProfessSchema[]>(professList)

  const formRules = getFormRules({
    userName: { label: '用户名', rules: [{ required: true, message: '请输入用户名' }] },
    phone: { label: '手机号', rules: [{ required: true, message: '请输入手机号' }] },
    roleId: { label: '角色', rules: [{ required: true, message: '请选择角色' }] },
    professional: { label: '专业' },
    orgId: { label: '所属组织', rules: [{ required: true, message: '请选择组织' }] },
    competenceIds: { label: '权限' },
    email: { label: '邮箱' },
    password: { label: '密码', rules: [{ required: true, message: '请输入密码' }] },
    remarks: { label: '备注' }
  })

  const fetchRoleList = async () => {
    const { data, retCode, retMsg } = await getRoleSelect2({})
    if (retCode !== 200) return message.warning(retMsg)
    const options = data.map(({ roleName, id }) => ({ label: roleName, value: id }))
    setRoleList(options)
  }

  const fetchCompetenceList = async () => {
    const reqBody = { competenceName: '' }
    const { data, retCode, retMsg } = await getCompetence(reqBody)
    if (retCode !== 200) return message.warning(retMsg)
    const options = data.map(({ competenceName, id }) => ({ label: competenceName, value: id }))
    setCompetenceList(options)
  }

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
    await fetchRoleList()
    await fetchOrgList()
    await fetchCompetenceList()
  }

  useEffect(() => {
    onMounted()
  }, [])

  const handleSubmit = async () => {
    const fields = form.getFieldsValue()
    const reqBody = {
      userId: !record ? undefined : record.userId,
      account: fields.phone,
      userName: fields.userName,
      headUrl: fields.headUrl,
      phone: fields.phone,
      roleId: fields.roleId,
      competenceIds: fields.competenceIds,
      orgId: fields.roleId !== 'ad' ? fields.orgId : undefined,
      professional: fields.professional,
      email: fields.email,
      password: fields.password,
      remarks: fields.remarks
    }

    await form.validateFields()
    const { retCode, retMsg } = !record ? await addUser(reqBody) : await updateUser(reqBody)
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
            <Form.Item {...formRules.userName}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item {...formRules.phone}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item {...formRules.roleId}>
              <Select placeholder="请选择" options={roleList} />
            </Form.Item>
            <Form.Item {...formRules.professional}>
              <Select placeholder="请选择" options={professSelectList} />
            </Form.Item>
            <Form.Item {...formRules.orgId}>
              <BzTreeSelect selectValue={record?.orgId} treeData={treeSelectList} />
            </Form.Item>
            <Form.Item {...formRules.competenceIds}>
              <Select placeholder="请选择" options={competenceList} />
            </Form.Item>
            <Form.Item {...formRules.email}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item {...formRules.password}>
              <Input placeholder="请输入" />
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

export default AddUser
