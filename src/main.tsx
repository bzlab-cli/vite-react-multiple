import ReactDOM from 'react-dom/client'
import '@/assets/iconfont/iconfont.scss'
import '@/styles/index.scss'
import 'antd/dist/reset.css'
import App from './app'

const render = Component => {
  ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(<Component />)
}

render(App)
