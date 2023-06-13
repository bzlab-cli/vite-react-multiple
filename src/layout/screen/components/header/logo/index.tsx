import { Settings } from '@/config/settings'

const Logo = () => {
  const goHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="logo-container">
      <img src={Settings.logo} className="logo-img" onClick={goHome} />
    </div>
  )
}

export default Logo
