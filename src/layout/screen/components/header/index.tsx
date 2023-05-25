import Logo from './logo'
import Menu from './menu'
import Time from './time'

const LayoutHeader = () => {
  return (
    <div className="screen-header">
      <Logo />
      <Menu />
      <Time />
    </div>
  )
}

export default LayoutHeader
