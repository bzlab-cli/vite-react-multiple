import ReactDOM from 'react-dom'
import '@/assets/iconfont/iconfont.scss'
import '@/styles/index.scss'
import 'antd/dist/reset.css'
import 'virtual:svg-icons-register'
// import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store } from '@/store/index'
import App from './app'

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component store={store}></Component>
    </Provider>,
    document.getElementById('app')
  )
}

render(App)

// ReactDOM.render(
//   // <React.StrictMode>
//   <Provider store={store}>
//     <PersistGate persistor={persistor}>
//       <App />
//     </PersistGate>
//   </Provider>,
//   // </React.StrictMode>,
//   document.getElementById('root')
// )

// import ReactDOM from "react-dom/client";
// react 18 创建（会导致 antd 菜单折叠时闪烁，等待官方修复）
// ReactDOM.createRoot(document.getElementById("root")!).render(
// 	// * react严格模式
// 	// <React.StrictMode>
// 	<Provider store={store}>
// 		<PersistGate persistor={persistor}>
// 			<App />
// 		</PersistGate>
// 	</Provider>
// 	// </React.StrictMode>
// );
