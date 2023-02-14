import { useState } from 'react'
import { Layout, Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useStoreDispatch } from '@/store'
import { login } from '@/store/modules/user'
import { getFormRules } from '@/utils'
import './index.scss'

const { Footer } = Layout

const Login = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useStoreDispatch()

  const formRules = getFormRules({
    username: { rules: [{ required: true, message: '请输入账号' }] },
    password: { rules: [{ required: true, message: '请输入密码' }] }
  })

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
    <div className="login-container">
      <div className="content">
        <div className="login-top">
          <div className="login-title">
            <img className="logo-img" src="/src/assets/images/logo/logo.png" />
            管理系统
          </div>
          <div className="login-desc">诚信卓越服务，创新超越自我</div>
        </div>
        <div className="login-main">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 5 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
            autoComplete="off"
          >
            <Form.Item {...formRules.username}>
              <Input placeholder="请输入账号" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item {...formRules.password}>
              <Input.Password autoComplete="new-password" placeholder="请输入密码" prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item className="login-btn">
              <Button type="primary" htmlType="submit" loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer>
        <div className="desc">
          <img className="icon" src="/images/login/logo.png" />
          <span>Technology provided by Frog Cloud Technology</span>
          <a className="beian" href="https://beian.miit.gov.cn" target="_blank" data-v-cfc305de="" rel="noreferrer">
            浙ICP备xxx号
          </a>
        </div>
      </Footer>
    </div>
  )
}

export default Login
