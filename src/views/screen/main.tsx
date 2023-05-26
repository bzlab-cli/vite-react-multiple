import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@/views/screen/store'
import { loadAllPlugins } from '@/plugins'
import '@/assets/iconfont/iconfont.scss'
import '@/assets/fonts/font.css'
import '@/styles/index.scss'
import 'antd/dist/reset.css'
import App from './app'
import 'virtual:svg-icons-register'

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement)
// 加载所有插件
loadAllPlugins(root)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
