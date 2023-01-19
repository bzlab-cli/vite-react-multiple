import { ConfigProvider } from 'antd'
import { Suspense } from 'react'
import Loading from '@/components/loading'
import { BrowserRouter as Router } from 'react-router-dom'
// import { RouterMiddleware } from '@/router'
import Auth, { RouterMiddleware } from '@/router/auth'
import zhCN from 'antd/lib/locale/zh_CN'

function App() {
  return (
    <Router>
      <ConfigProvider locale={zhCN}>
        <Suspense fallback={<Loading />}>
          <Auth>
            <RouterMiddleware />
          </Auth>
        </Suspense>
      </ConfigProvider>
    </Router>
  )
}

export default App
