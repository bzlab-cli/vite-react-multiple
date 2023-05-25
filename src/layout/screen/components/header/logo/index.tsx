import logo from '@/assets/images/logo/logo.png'

const Logo = () => {
  const goHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="logo-container">
      <img src={logo} className="logo-img" onClick={goHome} />
    </div>
  )
}

export default Logo
