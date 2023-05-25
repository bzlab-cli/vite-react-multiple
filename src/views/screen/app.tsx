import { ConfigProvider } from 'antd'
import { Suspense } from 'react'
import Loading from '@/components/loading'
import { BrowserRouter as Router } from 'react-router-dom'
import Permission, { RouterMiddleware } from '@/views/screen/router/permission'
import zhCN from 'antd/lib/locale/zh_CN'

function App() {
  return (
    <Router basename="/screen">
      <ConfigProvider locale={zhCN}>
        <Suspense fallback={<Loading />}>
          <Permission>
            <RouterMiddleware />
          </Permission>
        </Suspense>
      </ConfigProvider>
    </Router>
  )
}

export default App
