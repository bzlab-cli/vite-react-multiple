import LoginForm from './components/form'
import './index.scss'

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form">
          <div className="login-logo">
            <span className="logo-text">登录</span>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login
