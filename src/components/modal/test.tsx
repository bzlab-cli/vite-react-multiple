import { useState } from 'react'
import { Modal, Form, Input } from 'antd'

interface ModelProps {
  title: string
  record: { [key: string]: any }
  callback: (val?) => void
  destroy: (val?) => void
}

const TestModal = (props: ModelProps) => {
  const { title, record, callback } = props
  const [modalVisible, setModalVisible] = useState(true)
  const [form] = Form.useForm()
  const formLayout = { labelCol: { span: 4 } }
  console.log('TestModal', props)

  const handleOk = () => {
    setModalVisible(false)
    callback(true)
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  return (
    <Modal title={title} open={modalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
      <Form form={form} {...formLayout} initialValues={record}>
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

export default TestModal
