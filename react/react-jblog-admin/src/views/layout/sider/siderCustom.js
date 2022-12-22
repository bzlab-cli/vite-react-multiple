import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Layout} from 'antd'
import './sider.css'
import SiderMenu from './siderMenu'
import {appRouter} from "../../../router/routers";

const {Sider} = Layout;

@withRouter
class SiderCustom extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
        openKey: '',
        selectedKey: ''
    };

    menuClick = ({item, key, keyPath, domEvent}) => {
    };

    onOpenChange = (openKeys) => {
        this.props.siderOpenChange(openKeys)
    };

    render() {
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
                breakpoint="md"
                collapsedWidth="0"
                className="sider-contaniner">
                <div className="logo">阿杰博客</div>
                <SiderMenu
                    menus={appRouter}
                    onOpenChange={this.onOpenChange}
                    onClick={this.menuClick}
                    theme="dark"
                    mode="inline"
                    active={this.props.location.pathname || ''}
                    defaultOpenKeys={this.props.defaultOpenKeys}
                />
            </Sider>
        )
    }
}

export default SiderCustom
