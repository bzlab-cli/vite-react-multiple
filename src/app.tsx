// import { useState, useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { Suspense } from 'react'
// import { connect } from 'react-redux'
import Loading from '@/components/loading'
import { BrowserRouter as Router } from 'react-router-dom'
import { Permission } from './permission'
// import RenderRouter from '@/router'
import { Provider } from 'react-redux'
import { store } from '@/store'
import zhCN from 'antd/lib/locale/zh_CN'

const app = (props: any) => {
  console.log('App props', props)

  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN} input={{ autoComplete: 'off' }}>
        <Suspense fallback={<Loading />}>
          <Router>
            <Permission />
          </Router>
        </Suspense>
      </ConfigProvider>
    </Provider>
  )

  // const { size } = props
  // const { language, size } = props
  // const [i18nLocale, setI18nLocale] = useState(zhCN)
  // useEffect(() => {
  //   setI18nLocale(zhCN)
  // }, [language])

  // return (
  //   <HashRouter>
  //     <ConfigProvider locale={zhCN} componentSize={size}>
  //       <Permission>
  //         <RenderRouter />
  //       </Permission>
  //     </ConfigProvider>
  //   </HashRouter>
  // )

  // return (
  //   <ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
  //     <BrowserRouter basename="/admin">
  //       <AuthRouter>
  //         <Router />
  //       </AuthRouter>
  //     </BrowserRouter>
  //   </ConfigProvider>
  // )
}

export default app

// const mapStateToProps = (state: any) => state.app
// const mapDispatchToProps = {}
// export default connect(mapStateToProps, mapDispatchToProps)(App)
