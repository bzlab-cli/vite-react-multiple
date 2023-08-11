import { ConfigProvider } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import Permission, { RouterMiddleware } from '@/views/admin/router/permission'
import { KeepAliveScope } from '@bzlab/react-keep-alive'
import { getStoreState } from '@/views/admin/store'
import { createNamespace } from '@/utils'
import zhCN from 'antd/lib/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

function App() {
  const store = getStoreState()
  createNamespace(`bz.store`)
  bz.store = store

  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Permission>
          <KeepAliveScope>
            <RouterMiddleware />
          </KeepAliveScope>
        </Permission>
      </Router>
    </ConfigProvider>
  )
}

export default App
