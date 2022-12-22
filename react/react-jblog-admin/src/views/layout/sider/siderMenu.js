import React from 'react'
import {Menu, Icon} from 'antd'
import {Link} from 'react-router-dom'

const renderMenuItem = ({path, title, icon}) =>
        <Menu.Item
            key={path}
        >
            <Link to={path}>
                {icon && <Icon type={icon}/>}
                <span className="nav-text">{title}</span>
            </Link>
        </Menu.Item>

const renderSubMenu = ({path, title, icon, sub}) =>
        <Menu.SubMenu
            key={path}
            title={
                <span>
                    {icon && <Icon type={icon}/>}
                    <span className="nav-text">{title}</span>
                </span>
            }
        >
            {sub && sub.map(item => renderMenuItem(item))}
        </Menu.SubMenu>

export default ({menus, ...props}) => <Menu
    {...props}
    defaultSelectedKeys={[props.active]}
    defaultOpenKeys={props.defaultOpenKeys}
>
    {menus && menus.map(
        item => item.sub && item.sub.length ?
            renderSubMenu(item) : renderMenuItem(item)
    )}
</Menu>
