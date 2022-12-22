import { useState, useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { connect } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import AuthRouter from '@/router/utils/authRouter'
import Router from '@/router/index'
import zhCN from 'antd/lib/locale/zh_CN'

const App = (props: any) => {
  console.log('App props', props)

  const { language, assemblySize } = props
  const [i18nLocale, setI18nLocale] = useState(zhCN)
  useEffect(() => {
    setI18nLocale(zhCN)
  }, [language])

  return (
    <HashRouter>
      <ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </ConfigProvider>
    </HashRouter>
  )
}

const mapStateToProps = (state: any) => state.global
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(App)
