import { ConfigProvider } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import Permission, { RouterMiddleware } from '@/views/screen/router/permission'
import zhCN from 'antd/lib/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

function App() {
  return (
    <Router basename="/screen">
      <ConfigProvider locale={zhCN}>
        <Permission>
          <RouterMiddleware />
        </Permission>
      </ConfigProvider>
    </Router>
  )
}

export default App
