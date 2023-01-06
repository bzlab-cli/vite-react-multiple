import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const NotFound = () => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/')
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="请检查您输入的URL是否正确，或单击下面的按钮返回首页"
      extra={
        <Button type="primary" onClick={goHome}>
          返回首页
        </Button>
      }
    />
  )
}

export default NotFound
