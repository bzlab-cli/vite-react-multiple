import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getShowMenuList } from '@/utils/permission'
import { routes } from '@/views/screen/router'
import splitLine from '@/assets/images/screen/header/split-line.png'
import selectLine from '@/assets/images/screen/header/select-line.png'

const Menu = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [menuList, setMenuList] = useState<Router.RouteRecordRaw[]>([])

  useEffect(() => {
    const showMenus = getShowMenuList(routes) || []
    console.log('showMenus', showMenus)

    setMenuList(showMenus)
  }, [pathname])

  const onMenuClick = item => {
    if (pathname === item.path) return
    navigate(item.path)
  }

  function isCurrent(item) {
    return item.path === pathname || (item.children && item.children.some(item => item.path === pathname))
  }

  function isShowNoneLine(item) {
    return pathname !== item.path
  }

  return (
    <div className="menu-container">
      {menuList.map((item, index) => (
        <div key={index} className="title-item">
          <div className={`group-radio ${isCurrent(item) ? 'active' : ''}`} onClick={() => onMenuClick(item)}>
            <div className="title">{item.label}</div>
            {item.subLabel && (
              <div className={`subtitle ${isCurrent(item) ? 'subtitle-active' : ''}`}>{item.subLabel}</div>
            )}
            {(!item.children || (item.children && item.children.length === 0)) && pathname === item.path && (
              <img className="menu-select" src={selectLine} alt="" />
            )}
            {isShowNoneLine(item) && <img className="menu-select-none" src={selectLine} alt="" />}
            {item.children && isCurrent(item) && (
              <div className="child-content">
                {item.children.map((it, i) => (
                  <div
                    key={i}
                    className={`child-item ${isCurrent(it) ? 'active' : ''}`}
                    onClick={() => onMenuClick(it)}
                  >
                    <div className="title">{it.label}</div>
                    {it.subLabel && (
                      <div className={`subtitle ${isCurrent(it) ? 'subtitle-active' : ''}`}>{it.subLabel}</div>
                    )}
                    <img
                      className={pathname === it.path ? 'menu-select' : 'menu-select-none'}
                      src={selectLine}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          {index < menuList.length - 1 && <img className="split-line" src={splitLine} alt="" />}
        </div>
      ))}
    </div>
  )
}

export default Menu
