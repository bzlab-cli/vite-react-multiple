import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/store'
import { login } from '@/store/modules/user'

const LoginForm = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const onFinish = async form => {
    try {
      setLoading(true)
      await dispatch(login(form))
      message.success('登录成功！')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 5 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      size="large"
      autoComplete="off"
    >
      <Form.Item name="username" rules={[{ required: true, message: '请输入账号' }]}>
        <Input placeholder="请输入账号" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password autoComplete="new-password" placeholder="请输入密码" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item className="login-btn">
        <Button type="primary" htmlType="submit" loading={loading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
