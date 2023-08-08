import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useStoreSelector } from '@/views/admin/store'
import { layoutSettings } from '@/config/settings'
import './index.scss'

const NotFound = () => {
  const { authRoutes } = useStoreSelector(state => state.permission)
  const navigate = useNavigate()
  const goHome = () => {
    if (layoutSettings.showAuthMenu && !authRoutes.length) {
      return navigate('/login')
    }
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
