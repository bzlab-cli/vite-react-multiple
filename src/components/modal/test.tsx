import { useState, useEffect } from 'react'
import { Modal, message, Form, Input, Select } from 'antd'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { addUser, updateUser, getCompetence, getUser } from '@/api/auth/user'
import { getRoleSelect2 } from '@/api/auth/role'
import { getOrgSelect2 } from '@/api/auth/org'
import { forEachTree } from '@/utils'
import { IMajorSchema, majorList } from '@/constant/major'

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
  console.log('AddUser', props)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [roleList, setRoleList] = useState<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [treeSelectList, setTreeSelectList] = useState([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [competenceList, setCompetenceList] = useState<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [professionalSelectList, setProfessionalSelectList] = useState<IMajorSchema[]>(majorList)

  // const fetchUser = async () => {
  //   const reqBody = { userId: record.userId }
  //   const { data, retCode, retMsg } = await getUser(reqBody)
  //   if (retCode !== 200) return message.warning(retMsg)
  //   console.log('data', data)
  //   // for (const [key, value] of Object.entries(data)) form[key] = value
  // }

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
    setCompetenceList(data)
  }

  const fetchOrgList = async () => {
    const reqBody = { orgLevel: 1, parentId: 0 }
    const { data, retCode, retMsg } = await getOrgSelect2(reqBody)
    if (retCode !== 200) return message.warning(retMsg)
    forEachTree(data || [], item => {
      item.label = item.orgName
      item.value = item.id
    })
    setTreeSelectList(data)
  }

  const onMounted = async () => {
    await fetchRoleList()
    await fetchOrgList()
    await fetchCompetenceList()
    // if (record) {
    //   await fetchUser()
    // }
  }

  useEffect(() => {
    onMounted()
  }, [])

  const handleOk = () => {
    setModalVisible(false)
    callback(true)
  }

  return (
    <Modal title={title} open={modalVisible} onOk={handleOk} onCancel={() => setModalVisible(false)} destroyOnClose>
      <Form form={form} {...formLayout} initialValues={record}>
        {
          <>
            <Form.Item label="用户名" name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="手机号" name="phone" rules={[{ required: true, message: '请输入手机号' }]}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="角色" name="roleId" rules={[{ required: true, message: '请选择角色' }]}>
              <Select placeholder="请选择" options={roleList} />
            </Form.Item>
            <Form.Item label="专业" name="professional">
              <Select placeholder="请选择" options={professionalSelectList} />
            </Form.Item>
            <Form.Item label="所属组织" name="orgId" rules={[{ required: true, message: '请选择组织' }]}>
              <Select placeholder="请选择" options={[]} />
            </Form.Item>
            <Form.Item label="权限" name="competenceIds">
              <Select placeholder="请选择" options={competenceList} />
            </Form.Item>
            <Form.Item label="邮箱" name="email">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="备注" name="remarks">
              <Input placeholder="请输入" />
            </Form.Item>
          </>
        }
      </Form>
    </Modal>
  )
}

export default AddUser
