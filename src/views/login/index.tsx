import LoginForm from './components/login-form'
import logo from '@/assets/images/logo.png'
import './index.scss'

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form">
          <div className="login-logo">
            <img className="login-icon" src={logo} alt="logo" />
            <span className="logo-text">后台管理</span>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login
