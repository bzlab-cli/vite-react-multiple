import logo from '@/assets/images/logo/logo.png'
import { getStoreState } from '@/store'

const Logo = () => {
  const store = getStoreState()
  const opened = store.app.sidebar.opened
  return (
    <div className="logo-box">
      <img src={logo} alt="logo" className="logo-img" />
      {!opened ? <h2 className="logo-text">后台管理</h2> : null}
    </div>
  )
}

export default Logo
