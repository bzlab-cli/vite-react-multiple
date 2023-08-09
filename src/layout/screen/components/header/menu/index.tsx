import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getScreenShowMenuList } from '@/utils/permission'
import { routes } from '@/views/screen/router'
import { useStoreSelector } from '@/views/screen/store'
import { layoutSettings } from '@/config/settings'
import splitLine from '@/assets/images/screen/header/split-line.png'
import selectLine from '@/assets/images/screen/header/select-line.png'

const Menu = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { authRoutes } = useStoreSelector(state => state.permission)
  const [menuList, setMenuList] = useState<Router.RouteRecordRaw[]>([])

  useEffect(() => {
    const menus = layoutSettings.showScreenAuthMenu ? authRoutes : routes
    const showMenus = getScreenShowMenuList(menus) || []
    setMenuList(showMenus)
  }, [pathname])

  const onMenuClick = item => {
    let path = item.key
    if (item?.children?.length) {
      path = item?.children?.[0].key
    }
    if (pathname === path) return
    navigate(path)
  }

  function isActive(item) {
    return item.key === pathname || (item.children && item.children.some(item => item.key === pathname))
  }

  function isShowNoneLine(item) {
    return pathname !== item.key
  }

  return (
    <div className="menu-container">
      {menuList.map((item, index) => (
        <div key={index} className="title-item">
          <div className={`group-radio ${isActive(item) ? 'active' : ''}`} onClick={() => onMenuClick(item)}>
            <div className="title">{item.label}</div>
            {item.subLabel && (
              <div className={`subtitle ${isActive(item) ? 'subtitle-active' : ''}`}>{item.subLabel}</div>
            )}
            {pathname === item.key && !item.children && <img className="menu-select" src={selectLine} alt="" />}
            {isShowNoneLine(item) && <img className="menu-select-none" src={selectLine} alt="" />}
            {item.children && isActive(item) && (
              <div className="child-content">
                {item.children.map((it, i) => (
                  <div key={i} className={`child-item ${isActive(it) ? 'active' : ''}`} onClick={() => onMenuClick(it)}>
                    <div className="title">{it.label}</div>
                    {it.subLabel && (
                      <div className={`subtitle ${isActive(it) ? 'subtitle-active' : ''}`}>{it.subLabel}</div>
                    )}
                    <img className={pathname === it.key ? 'menu-select' : 'menu-select-none'} src={selectLine} alt="" />
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
