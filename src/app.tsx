import { ConfigProvider } from 'antd'
import { Suspense } from 'react'
import Loading from '@/components/loading'
import { BrowserRouter as Router } from 'react-router-dom'
import { RouterMiddleware } from '@/router'
import { Provider } from 'react-redux'
import { store } from '@/store'
import zhCN from 'antd/lib/locale/zh_CN'

const app = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN} input={{ autoComplete: 'off' }}>
        <Suspense fallback={<Loading />}>
          <Router>
            <RouterMiddleware />
          </Router>
        </Suspense>
      </ConfigProvider>
    </Provider>
  )
}

export default app
