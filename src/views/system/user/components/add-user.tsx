// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useImperativeHandle, Ref, useEffect } from 'react'
import { Modal, message, Form, Input } from 'antd'
import { IMajorSchema, majorList } from '@/constant/major'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { addUser, updateUser, getCompetence, getUser } from '@/api/auth/user'
import { getRoleSelect2 } from '@/api/auth/role'
import { getOrgSelect2 } from '@/api/auth/org'
import { forEachTree } from '@/utils'

interface ModalProps {
  innerRef: Ref<{ visible: (params: any) => void }>
}

const AddUser = (props: ModalProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [attrs, setAttrs] = useState<any>()
  const [record, setRecord] = useState<any>(null)
  const [form] = Form.useForm()
  const formLayout = { labelCol: { span: 4 } }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [roleList, setRoleList] = useState<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [treeSelectList, setTreeSelectList] = useState([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [competenceList, setCompetenceList] = useState<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [professionalSelectList, setProfessionalSelectList] = useState<IMajorSchema[]>(majorList)

  useImperativeHandle(props.innerRef, () => ({ visible }))

  const fetchUser = async () => {
    console.log('fetchUser', attrs)
    const reqBody = { userId: attrs.record.userId }
    const { data, retCode, retMsg } = await getUser(reqBody)
    if (retCode !== 200) return message.warning(retMsg)
    console.log('data', data)

    // for (const [key, value] of Object.entries(data)) form[key] = value
  }

  const fetchRoleList = async () => {
    const { data, retCode, retMsg } = await getRoleSelect2({})
    if (retCode !== 200) return message.warning(retMsg)
    setRoleList(data)
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

  // const onMounted = async () => {
  //   console.log('attrs', attrs)

  //   await fetchRoleList()
  //   await fetchOrgList()
  //   await fetchCompetenceList()
  //   if (!attrs.isAdd) {
  //     await fetchUser()
  //   }
  // }

  // useEffect(() => {
  //   onMounted()
  // }, [])

  const visible = async params => {
    setAttrs(params)
    console.log('params', params)

    setRecord(params.record)
    await fetchRoleList()
    await fetchOrgList()
    await fetchCompetenceList()
    if (!attrs?.isAdd) {
      await fetchUser()
    }
    setModalVisible(true)
  }

  const handleOk = () => {
    setModalVisible(false)
  }

  const handleCancel = () => {
    console.log('cancel')
    setRecord({ userName: '' })
    setModalVisible(false)
  }

  return (
    <Modal title={attrs?.title} open={modalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
      <Form form={form} {...formLayout} initialValues={record || undefined}>
        {
          <>
            <Form.Item label="用户名" name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="手机号" name="phone" rules={[{ required: true, message: '请输入手机号' }]}>
              <Input placeholder="请输入" />
            </Form.Item>
          </>
        }
      </Form>
    </Modal>
  )
}

export default AddUser
