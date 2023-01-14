import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@/store'
import '@/assets/iconfont/iconfont.scss'
import '@/styles/index.scss'
import 'antd/dist/reset.css'
import App from './app'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
